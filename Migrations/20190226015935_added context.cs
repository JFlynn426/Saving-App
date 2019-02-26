using Microsoft.EntityFrameworkCore.Migrations;

namespace SavingApp.Migrations
{
    public partial class addedcontext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Saved",
                table: "SavingGoal",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Goal",
                table: "SavingGoal",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Saved",
                table: "SavingGoal",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Goal",
                table: "SavingGoal",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
