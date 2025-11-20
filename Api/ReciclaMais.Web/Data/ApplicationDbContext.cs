using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<RecycleMaterial> RecycleMaterials { get; set; }
    public DbSet<RecyclePoint> RecyclePoints { get; set; }
    public DbSet<RecycleReward> RecycleRewards { get; set; }
    public DbSet<UserReward> UserRewards { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}

