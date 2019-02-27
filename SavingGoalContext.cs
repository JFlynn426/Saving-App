using System;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using saving_app.Models;

namespace saving_app
{
    public partial class SavingGoalContext : DbContext
    {
        public SavingGoalContext()
        {
        }

        public SavingGoalContext(DbContextOptions<SavingGoalContext> options)
            : base(options)
        {
        }

        private string ConvertPostConnectionToConnectionString(string connection)
    {
      var _connection = connection.Replace("postgres://", String.Empty);
      var output = Regex.Split(_connection, ":|@|/");
      return $"server={output[2]};database={output[4]};User Id={output[0]}; password={output[1]}; port={output[3]}";
    }

    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var envConn = Environment.GetEnvironmentVariable("DATABASE_URL");
                var conn = "server=localhost;database=SavingGoal;user id=flynn;password=dev";
                if (envConn != null)
        {
          conn = ConvertPostConnectionToConnectionString(envConn);
        }
        optionsBuilder.UseNpgsql(conn);
      }
    
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.1-servicing-10028");
            // modelBuilder.Entity<SavingGoal>().HasData( 
            //   new SavingGoal {Id = -1, Title : "Rainy Day", Goal : 1000, Saved:100 } );
        }
        public DbSet<SavingGoal> SavingGoal { get; set; }
    }
}
