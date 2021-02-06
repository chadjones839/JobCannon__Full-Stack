using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class School
    {
        public int Id { get; set; }

        [Required]
        [StringLength(72)]
        public string Company { get; set; }

    }
}
