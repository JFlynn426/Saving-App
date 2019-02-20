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
    public class UpdateGoalController : Controller
    {
        private SavingGoalContext db;
        public UpdateGoalController()
        {
            this.db= new SavingGoalContext();
        }

            public class NewGoalViewModel
            {
                public int NewGoal { get; set; }
            }

        [HttpPut("{id}")]

        public async Task<ActionResult<SavingGoal>> Put([FromRoute] int id, [FromBody] NewGoalViewModel NewGoal)
        {
            var ChangedGoal = this.db.SavingGoal.First(SavingGoal => SavingGoal.Id == id);
            ChangedGoal.Goal = NewGoal.NewGoal;
            await this.db.SaveChangesAsync();
            return ChangedGoal;
        }
    }
}