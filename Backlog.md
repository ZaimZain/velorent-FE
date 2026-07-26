# Prioritized Backlog
```
1. General > UI Design
2. Car Module > Delete Car Bugfix
3. General > Unable to Maintain Session
```

# General Layout
### =================================================================================
- ## UI Design [FOCUSED]
### `Front` _:: Branch ~ /feature/(Create new. Don't use feature/sideBar)_
#### Finalized the Topbar, Sidebar and all basic UI for small and big screen (>1024px).
```
1. Find responsive applied on the body and do the same for sideBar. 
    i. Sample code in notepad++ for sideBar, topBar and PageLayout.
2. Test in Mobile and Tablet. Resize everything accordingly
```

- ## Unable to Maintain Session
### `Front` `Back` _:: Branch ~ /bugFix/login-timeout_  
#### Backend session ended earlier than Frontend (Abandon if not working) (Temp commited)
```
1. Modify timer control and centralize it in config (Chatgpt prompted)
```

# __Car Module__
### =================================================================================
- ## DELETE Car Bugfix
### `Front` `Back` _:: Branch ~ /feature/carCRUD_  
#### Delete Car button does not work yet.
```
1. deleteCar should be changing the status only and not deleting in DB.
2. Enable deleteCar button in FE.
    i. Deleted Pill should be shown in the card.
```