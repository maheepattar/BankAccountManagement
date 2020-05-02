using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Bank
    {
        [Key]
        public int BankId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(25)")]
        public string BankName { get; set; }
    }
}
