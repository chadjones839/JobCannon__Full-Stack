using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class Candidate
    {
        public int Id { get; set; }

        [StringLength(25)]
        public string FirstName { get; set; }

        [StringLength(25)]
        public string LastName { get; set; }

        [StringLength(35)]
        public string Location { get; set; }

        [StringLength(50)]
        public string JobTitle { get; set; }
    }
}
