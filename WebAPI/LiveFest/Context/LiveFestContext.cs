using LiveFest.Domains;
using Microsoft.EntityFrameworkCore;

namespace LiveFest.Context
{
    public class LiveFestContext : DbContext
    {
        public LiveFestContext()
        {
        }

        public LiveFestContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<Evaluation> Evaluation { get; set; }
        public DbSet<SaveEvents> SaveEvents { get; set; }

    }
}
