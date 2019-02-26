using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using saving_app.Models;

namespace saving_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UpdateGoalController : Controller
    {   
        
        private string _getUserId(System.Security.Claims.ClaimsPrincipal user)
        {
            var userId = user.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            return userId;
        }
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

        public async Task<ActionResult<List<SavingGoal>>> Put([FromRoute] int id, [FromBody] NewGoalViewModel NewGoal)
        {
            var ChangedGoal = this.db.SavingGoal.First(SavingGoal => SavingGoal.Id == id);
            ChangedGoal.Goal = NewGoal.NewGoal;
            await this.db.SaveChangesAsync();
            var results = this.db.SavingGoal.OrderBy(goal => goal.Id);
            return results.ToList();
        }
    }
}