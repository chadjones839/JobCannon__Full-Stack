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
    public class JobController : ControllerBase
    {
        private readonly IJobRepository _jobRepo;
        public JobController(
            IJobRepository jobRepository)
        {
            _jobRepo = jobRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_jobRepo.GetAllJobs());
        }

        [HttpGet("employer-listings/{id}")]
        public IActionResult GetAllJobsByEmployerId(int id)
        {
            return Ok(_jobRepo.GetAllJobsByEmployerId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetJob(int id)
        {
            return Ok(_jobRepo.GetJobById(id));
        }

        [HttpPost]
        public IActionResult Post(Job job)
        {
            _jobRepo.Add(job);
            return CreatedAtAction("GetJob", new { id = job.Id }, job);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }
            _jobRepo.Update(job);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _jobRepo.Delete(id);
            return NoContent();
        }
    }
}