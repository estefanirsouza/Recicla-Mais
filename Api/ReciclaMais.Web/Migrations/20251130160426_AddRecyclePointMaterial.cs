using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReciclaMais.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddRecyclePointMaterial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecyclePointMaterials",
                columns: table => new
                {
                    RecyclePointMaterialId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecyclePointId = table.Column<int>(type: "INTEGER", nullable: false),
                    RecycleMaterialId = table.Column<int>(type: "INTEGER", nullable: false),
                    DateInsert = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecyclePointMaterials", x => x.RecyclePointMaterialId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecyclePointMaterials");
        }
    }
}
