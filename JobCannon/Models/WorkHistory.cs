using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class WorkHistory
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string JobTitle { get; set; }

        [Required]
        [StringLength(50)]
        public string Company { get; set; }

        [Required]
        [StringLength(50)]
        public string Location { get; set; }

        [Required]
        [StringLength(10)]
        public string StartMonth { get; set; }

        [Required]
        public int StartYear { get; set; }

        [StringLength(10)]
        public string EndMonth { get; set; }

        public int EndYear { get; set; }

        [Required]
        public bool Current { get; set; }

        public string Description { get; set; }
    }
}
