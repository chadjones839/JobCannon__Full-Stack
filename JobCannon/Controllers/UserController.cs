using System;
using Microsoft.AspNetCore.Mvc;
using JobCannon.Repositories;
using JobCannon.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace JobCannon.Controllers
{
    /*[Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public UserController(
            IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepo.GetAllUsers());
        }

        [HttpGet("candidates")]
        public IActionResult GetAllCandidates()
        {
            return Ok(_userRepo.GetAllCandidates());
        }

        [HttpGet("employers")]
        public IActionResult GetAllEmployers()
        {
            return Ok(_userRepo.GetAllEmployers());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userRepo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("userId/{id}")]
        public IActionResult GetUser(int id)
        {
            return Ok(_userRepo.GetUserById(id));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepo.Add(user);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepo.Update(user);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _userRepo.Delete(id);
            return NoContent();
        }
    }
}