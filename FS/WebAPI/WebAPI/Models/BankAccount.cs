using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class BankAccount
    {
        [Key]
        public int BankAccountId { get; set; }

        [Required]
        [Column(TypeName ="nvarchar(25)")]
        public string  AccountNumber { get; set; }

        [Required]
        [Column(TypeName ="nvarchar(30)")]
        public string AccountHolder { get; set; }

        [Required]
        public int BankId { get; set; }

        [Required]
        [Column(TypeName ="nvarchar(10)")]
        public string IFSC { get; set; }
    }
}
