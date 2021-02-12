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
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepo;
        public ChatController(
            IChatRepository chatRepository)
        {
            _chatRepo = chatRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_chatRepo.GetAllChats());
        }

        [HttpGet("{id}")]
        public IActionResult GetChatById(int id)
        {
            return Ok(_chatRepo.GetChatById(id));
        }

        [HttpPost]
        public IActionResult Post(Chat chat)
        {
            _chatRepo.Add(chat);
            return CreatedAtAction("GetChat", new { id = chat.Id }, chat);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Chat chat)
        {
            if (id != chat.Id)
            {
                return BadRequest();
            }
            _chatRepo.Update(chat);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _chatRepo.Delete(id);
            return NoContent();
        }
    }
}