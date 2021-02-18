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
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepo;
        public SchoolController(
            ISchoolRepository schoolRepository)
        {
            _schoolRepo = schoolRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_schoolRepo.GetAllSchool());
        }

        [HttpGet("userId/{userId}")]
        public IActionResult GetSchoolsByUserId(int userId)
        {
            return Ok(_schoolRepo.GetSchoolsByUserId(userId));
        }

        [HttpGet("school-id/{id}")]
        public IActionResult GetSchoolById(int id)
        {
            return Ok(_schoolRepo.GetSchoolById(id));
        }

        [HttpPost]
        public IActionResult Post(School school)
        {
            _schoolRepo.Add(school);
            return CreatedAtAction("GetSchool", new { id = school.Id }, school);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, School school)
        {
            if (id != school.Id)
            {
                return BadRequest();
            }
            _schoolRepo.Update(school);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _schoolRepo.Delete(id);
            return NoContent();
        }
    }
}