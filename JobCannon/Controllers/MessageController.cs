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
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepo;
        public MessageController(
            IMessageRepository messageRepository)
        {
            _messageRepo = messageRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_messageRepo.GetAllMessages());
        }

        [HttpGet("chat/{id}")]
        public IActionResult GetAllMessagesByChatId(int id)
        {
            return Ok(_messageRepo.GetMessagesByChatId(id));
        }

        [HttpGet("recent/{chatId}")]
        public IActionResult GetLastMessage(int chatId)
        {
            return Ok(_messageRepo.GetLastMessage(chatId));
        }

        [HttpPost]
        public IActionResult Post(Message message)
        {
            _messageRepo.Add(message);
            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }
            _messageRepo.Update(message);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _messageRepo.Delete(id);
            return NoContent();
        }
    }
}