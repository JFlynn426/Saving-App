using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using saving_app.Models;

namespace saving_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NewGoalController : Controller
    {   
        private string _getUserId(System.Security.Claims.ClaimsPrincipal user)
        {
            var userId = user.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            return userId;
        }
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
