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
    public class GetGoalsController : Controller
    {
        private SavingGoalContext db;
        public GetGoalsController()
        {
            this.db= new SavingGoalContext();
        }
    [HttpGet]
    public async Task<ActionResult<List<SavingGoal>>> GetGoals()
    {
        var results = this.db.SavingGoal.OrderBy(goal => goal.Id);
        return await results.ToListAsync();
    }
    }
}
