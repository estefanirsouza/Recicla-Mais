using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReciclaMais.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddRecycleRewardAndUserReward : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecycleRewards",
                columns: table => new
                {
                    RecycleRewardId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserStoreId = table.Column<Guid>(type: "TEXT", nullable: true),
                    UserPartnerId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Neighborhood = table.Column<string>(type: "TEXT", nullable: true),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    State = table.Column<string>(type: "TEXT", nullable: true),
                    ZipCode = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    DefaultValidDays = table.Column<int>(type: "INTEGER", nullable: true),
                    DateInsert = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DateUpdate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecycleRewards", x => x.RecycleRewardId);
                });

            migrationBuilder.CreateTable(
                name: "UserRewards",
                columns: table => new
                {
                    UserRewardId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecycleRewardId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Token = table.Column<string>(type: "TEXT", nullable: true),
                    DateValid = table.Column<DateTime>(type: "TEXT", nullable: true),
                    TokenUsed = table.Column<bool>(type: "INTEGER", nullable: true),
                    DateInsert = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DateUpdate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRewards", x => x.UserRewardId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecycleRewards");

            migrationBuilder.DropTable(
                name: "UserRewards");
        }
    }
}
