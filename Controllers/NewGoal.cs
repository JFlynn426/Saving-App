using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using saving_app.Models;

namespace saving_app.Controllers
{
    [Route("api/[controller]")]
    public class NewGoalController : Controller
    {
        private SavingGoalContext db;
        public NewGoalController()
        {
            this.db= new SavingGoalContext();
        }
        [HttpPost]
        public async Task<ActionResult<SavingGoal>> Post([FromBody] SavingGoal newSavingGoal)
         {
      this.db.SavingGoal.Add(newSavingGoal);
      await this.db.SaveChangesAsync();
      return newSavingGoal;
    }
     [HttpDelete("{id}")]
        public async Task<ActionResult<List<SavingGoal>>> Delete([FromRoute] int id)
         {
      var GoalToRemove = this.db.SavingGoal.FirstOrDefault(SavingGoal => SavingGoal.Id == id);
      this.db.SavingGoal.Remove(GoalToRemove);
      await this.db.SaveChangesAsync();
      var results = this.db.SavingGoal.OrderBy(goal => goal.Id);
      return results.ToList();
    }
    }
}
