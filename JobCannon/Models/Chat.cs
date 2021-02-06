using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class Chat
    {
        public int Id { get; set; }

        [Required]
        public int InitiatingUserId { get; set; }

        [Required]
        public int ReciprocatingUserId { get; set; }

        public bool? MutualInterest { get; set; }

    }
}
