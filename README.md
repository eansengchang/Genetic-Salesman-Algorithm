# Genetic Salesman Algorithm
A visualisation of how the travelling salesman problem can be solved using a genetic algorithms of paths.
## Selection Algorithms
These are the algorithms that are used to pick the fittest routes in order to be used for the mating pool.
- Truncation selection
- Roulette Wheel Selection
- Stochastic Universal Sampling
- tournamentSelection
## Crossover Algorithms
This is the algorithm used to "genetically" combine 2 parents into a new route. Simplie crossovers such as 1 or 2 point crossovers do not work in this situatino because every chain of cities need to be linked and crossing paths may lead to cities omited or duplicated.
- Partially Mapped Crossover
- Order crossover
- Cycle crossover
## Interesting Points to Note
- Roulette wheel selection is by far the worst kind of selection, the use of stochastic wheel sampling greatly increased its effectiveness
- the tournament probability was randomly picked and further experimentation can be done
- Mutation is done by either randomly switching 2 points of a route or removing a point and randomly inserting it somewhere else
- Attempting to find the most effective crossover method by just looking at the visual is quite hard
- Tournement selection appears to be the fastest at narrowing down to a specific path compared to the others, with stochastic sampling and truncated selection following on.