using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitHappens.Domain.Journal.Migrations
{
    /// <inheritdoc />
    public partial class ChangedMessages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_Messages", table: "Messages");

            migrationBuilder
                .AlterColumn<long>(
                    name: "Timestamp",
                    table: "Messages",
                    type: "INTEGER",
                    nullable: false,
                    oldClrType: typeof(long),
                    oldType: "INTEGER"
                )
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                table: "Messages",
                column: "JournalId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Timestamp",
                table: "Messages",
                column: "Timestamp"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Type",
                table: "Messages",
                column: "Type"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_Messages", table: "Messages");

            migrationBuilder.DropIndex(name: "IX_Messages_Timestamp", table: "Messages");

            migrationBuilder.DropIndex(name: "IX_Messages_Type", table: "Messages");

            migrationBuilder
                .AlterColumn<long>(
                    name: "Timestamp",
                    table: "Messages",
                    type: "INTEGER",
                    nullable: false,
                    oldClrType: typeof(long),
                    oldType: "INTEGER"
                )
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                table: "Messages",
                column: "Timestamp"
            );
        }
    }
}
