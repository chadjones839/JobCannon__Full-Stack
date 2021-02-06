using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string FirebaseUserId { get; set; }

        public string ImageUrl { get; set; }

        public string Bio { get; set; }

        public int? CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int? EmployerId { get; set; }
        public Employer Employer { get; set; }
    }
}
