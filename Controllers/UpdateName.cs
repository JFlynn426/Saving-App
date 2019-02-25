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
    public class UpdateNameController : Controller
    {
        private SavingGoalContext db;
        public UpdateNameController()
        {
            this.db= new SavingGoalContext();
        }

            public class NewNameViewModel
            {
                public string NewName { get; set; }
            }

        [HttpPut("{id}")]

        public async Task<ActionResult<List<SavingGoal>>> Put([FromRoute] int id, [FromBody] NewNameViewModel NewName)
        {
            var ChangedGoal = this.db.SavingGoal.First(SavingGoal => SavingGoal.Id == id);
            ChangedGoal.Title = NewName.NewName;
            this.db.SaveChanges();
            var results = this.db.SavingGoal.OrderBy(goal => goal.Id);
            return results.ToList();
        }
    }
}