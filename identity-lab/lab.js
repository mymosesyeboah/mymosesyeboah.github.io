"use strict";
let employee = {status: "new", department: null};
const byId = id => document.getElementById(id);
function permitted(app) { return employee.status === "active" && employee.department === app; }
function announce(title, detail) { byId("decision-title").textContent=title; byId("decision-detail").textContent=detail; }
function log(message) { const item=document.createElement("li");item.textContent=message;byId("events").prepend(item); }
function render() {
 byId("employee-status").textContent=({new:"Not onboarded",active:"Active",inactive:"Inactive"})[employee.status];
 byId("employee-department").textContent=employee.department || "None";
 byId("join").disabled=employee.status!=="new";
 byId("move").disabled=employee.status!=="active" || employee.department!=="Finance";
 byId("leave").disabled=employee.status!=="active";
 for(const app of ["Finance","Sales","Marketing"]){const node=byId(app.toLowerCase()+"-access");node.textContent=permitted(app)?"Allowed":"Denied";node.classList.toggle("allowed",permitted(app));}
}
byId("join").addEventListener("click",()=>{if(employee.status!=="new")return;employee={status:"active",department:"Finance"};render();announce("Jordan can access Finance.","Simulated account creation and Finance.User assignment completed. Sales and Marketing remain denied.");log("Joined Finance: account provisioned and Finance.User assigned (simulated).");});
byId("move").addEventListener("click",()=>{if(!permitted("Finance"))return;employee.department="Sales";render();announce("Sales allowed. Finance denied.","Simulated transfer removed Finance.User, assigned Sales.User and changed the HR access version. Check Finance to model refreshing the old dashboard.");log("Moved to Sales: old role removed, new role assigned and HR policy updated (simulated).");});
byId("leave").addEventListener("click",()=>{if(employee.status!=="active")return;employee.status="inactive";render();announce("Jordan is inactive. All apps deny access.","Simulated HR policy blocks protected requests. The real workflow also disables the Entra account, requests session revocation and removes managed roles.");log("Deactivated: policy blocked, account disabled, revocation requested and managed roles removed (simulated).");});
document.querySelectorAll("[data-app]").forEach(button=>button.addEventListener("click",()=>{const app=button.dataset.app;const allowed=permitted(app);announce(app+": "+(allowed?"access allowed":"access denied"),allowed?"Jordan is active in "+app+" with the required simulated department role.":employee.status==="new"?"Jordan has not been onboarded. There is no authenticated employee session.":employee.status==="inactive"?"The HR record is inactive. A previously established app session does not override the current policy.":"Jordan belongs to "+employee.department+", not "+app+". Authentication does not grant every department role.");log(app+" access check: "+(allowed?"allowed":"denied")+".");}));
byId("reset").addEventListener("click",()=>{employee={status:"new",department:null};render();byId("events").replaceChildren();log("Demonstration reset. No employee has been provisioned.");announce("Start with onboarding.","Jordan has no account or department access yet.");});
render();

