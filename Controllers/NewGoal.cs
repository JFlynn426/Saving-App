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
        private DatabaseContext db;
        public NewGoalController()
        {
            this.db= new DatabaseContext();
        }
        [HttpPost]
        public async Task<ActionResult<SavingGoal>> Post([FromBody] SavingGoal newSavingGoal)
         {
    //   this.db.SavingGoal.Add(newSavingGoal);
      await this.db.SaveChangesAsync();
      return newSavingGoal;
    }
    }
}
