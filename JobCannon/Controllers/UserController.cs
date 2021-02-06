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
    }
}