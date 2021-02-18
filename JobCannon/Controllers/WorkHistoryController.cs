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
    public class WorkHistoryController : ControllerBase
    {
        private readonly IWorkHistoryRepository _workHistoryRepo;
        public WorkHistoryController(
            IWorkHistoryRepository workHistoryRepository)
        {
            _workHistoryRepo = workHistoryRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_workHistoryRepo.GetAllWorkHistory());
        }

        [HttpGet("candidates")]
        public IActionResult GetWorkHistoryByUserId(int id)
        {
            return Ok(_workHistoryRepo.GetAllWorkHistoryByUserId(id));
        }

        [HttpGet("employers")]
        public IActionResult GetWorkHistoryById(int id)
        {
            return Ok(_workHistoryRepo.GetWorkHistoryById(id));
        }

        [HttpPost]
        public IActionResult Post(WorkHistory workHistory)
        {
            _workHistoryRepo.Add(workHistory);
            return CreatedAtAction("GetJob", new { id = workHistory.Id }, workHistory);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, WorkHistory workHistory)
        {
            if (id != workHistory.Id)
            {
                return BadRequest();
            }
            _workHistoryRepo.Update(workHistory);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _workHistoryRepo.Delete(id);
            return NoContent();
        }
    }
}