using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public string ChatId { get; set; }
        public Chat Chat { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        [StringLength(250)]
        public string Content { get; set; }
    }
}
