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
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateRepository _candidateRepo;
        public CandidateController(
            ICandidateRepository candidateRepository)
        {
            _candidateRepo = candidateRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetCandidate(int id)
        {
            return Ok(_candidateRepo.GetCandidateById(id));
        }

        [HttpPost]
        public IActionResult Post(Candidate candidate)
        {

            _candidateRepo.Add(candidate);
            return CreatedAtAction("GetCandidate", new { id = candidate.Id }, candidate);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Candidate candidate)
        {
            if (id != candidate.Id)
            {
                return BadRequest();
            }
            _candidateRepo.Update(candidate);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _candidateRepo.Delete(id);
            return NoContent();
        }
    }
}