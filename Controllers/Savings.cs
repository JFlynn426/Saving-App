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
    
    public class AddToSavedController : Controller
    {
        private string _getUserId(System.Security.Claims.ClaimsPrincipal user)
        {
            var userId = user.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            return userId;
        }
        private SavingGoalContext db;
        public AddToSavedController()
        {
            this.db= new SavingGoalContext();
        }
        public class AddSavedViewModel
            {
                public int AddSaved { get; set; }
            }

        [HttpPut("{id}")]

        public async Task<ActionResult<List<SavingGoal>>> Put([FromRoute] int id, [FromBody] AddSavedViewModel AddSaved)
        {
            var ChangedSaved = this.db.SavingGoal.First(SavingGoal => SavingGoal.Id == id);
            ChangedSaved.Saved += AddSaved.AddSaved;
            await this.db.SaveChangesAsync();
            var results = this.db.SavingGoal.OrderBy(goal => goal.Id);
            return results.ToList();
        }
    }
}