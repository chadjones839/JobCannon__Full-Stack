using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class Job
    {
        public int Id { get; set; }

        [Required]
        public int EmployerId { get; set; }
        public Employer Employer { get; set; }

        [Required]
        public DateTime PostDate { get; set; }

        [Required]
        [StringLength(50)]
        public string JobTitle { get; set; }

        [Required]
        [StringLength(50)]
        public string JobLocation { get; set; }

        [Required]
        public int Salary { get; set; }

        [Required]
        [StringLength(25)]
        public string Rate { get; set; }

        [Required]
        public string Requirements { get; set; }

        [Required]
        public string JobSummary { get; set; }

        [Required]
        [StringLength(25)]
        public string Type { get; set; }

        [StringLength(25)]
        public string Keyword1 { get; set; }

        [StringLength(25)]
        public string Keyword2 { get; set; }

        [StringLength(25)]
        public string Keyword3 { get; set; }

    }
}
