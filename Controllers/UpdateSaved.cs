using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using saving_app.Models;

namespace saving_app.Controllers
{
    [Route("api/[controller]")]
    public class UpdateSavedController : Controller
    {
        private SavingGoalContext db;
        public UpdateSavedController()
        {
            this.db= new SavingGoalContext();
        }
        public class NewSavedViewModel
            {
                public int NewSaved { get; set; }
            }

        [HttpPut("{id}")]

        public async Task<ActionResult<SavingGoal>> Put([FromRoute] int id, [FromBody] NewSavedViewModel NewSaved)
        {
            var ChangedSaved = this.db.SavingGoal.First(SavingGoal => SavingGoal.Id == id);
            ChangedSaved.Goal = NewSaved.NewSaved;
            await this.db.SaveChangesAsync();
            return ChangedSaved;
        }
    }
}