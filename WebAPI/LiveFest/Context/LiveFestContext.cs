using LiveFest.Domains;
using Microsoft.EntityFrameworkCore;

namespace LiveFest.Context
{
    public class LiveFestContext : DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<Evaluation> Evaluation { get; set; }
        public DbSet<SaveEvents> SaveEvents { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server= SUPORTE\\SQLEXPRESS; Database= LiveFestServer; User Id=sa; Pwd=Senai@134; TrustServerCertificate= True");

            base.OnConfiguring(optionsBuilder);
        }
    }
}
