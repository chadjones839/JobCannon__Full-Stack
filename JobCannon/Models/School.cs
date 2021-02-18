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
        public int UserId { get; set; }

        [Required]
        [StringLength(72)]
        public string SchoolName { get; set; }

        [Required]
        [StringLength(50)]
        public string Field { get; set; }

        [Required]
        [StringLength(50)]
        public string Degree { get; set; }

        [Required]
        [StringLength(10)]
        public string StartMonth { get; set; }

        [Required]
        public int StartYear { get; set; }

        [StringLength(10)]
        public string? EndMonth { get; set; }

        public int? EndYear { get; set; }

        [Required]
        public bool Current { get; set; }

    }
}
