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
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerRepository _employerRepo;
        public EmployerController(
            IEmployerRepository employerRepository)
        {
            _employerRepo = employerRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployer(int id)
        {
            return Ok(_employerRepo.GetEmployerById(id));
        }

        [HttpPost]
        public IActionResult Post(Employer employer)
        {
            _employerRepo.Add(employer);
            return CreatedAtAction("GetEmployer", new { id = employer.Id }, employer);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Employer employer)
        {
            if (id != employer.Id)
            {
                return BadRequest();
            }
            _employerRepo.Update(employer);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _employerRepo.Delete(id);
            return NoContent();
        }
    }
}