using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobCannon.Models
{
    public class Employer
    {
        public int Id { get; set; }

        [StringLength(75)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Industry { get; set; }

        [StringLength(50)]
        public string Location { get; set; }

    }
}
