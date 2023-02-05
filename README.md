# detective graph

The goal:

- compute a list of available leads
- time-travel to see what we did in what order

Discovery:

- in order to have leads, we need to add them during card investigation
  - so when investigating a card, let's add it to the system including its leads
- in order to have available leads, we need to keep track of investigated ones
  - so when investigating a card, let's mark it as already seen
- in order to have time-travel, we can use redux for adding cards

User journey:

- adding cards
  1. we enter the name of the card we are investigating
  2. we add a list of leads that card has
- looking for leads
  1. we toggle a view for

1a. there could be an autocomplete/dropdown sorted by most recently added
1b. investigated card should be marked differently from untouched ones
