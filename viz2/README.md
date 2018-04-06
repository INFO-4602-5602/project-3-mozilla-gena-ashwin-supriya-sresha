

<h3> Visualization 1 : Heat Map of Nerd-level vs the Features each Nerd gives Importance to. </h3>
For the task of understanding what each person in Nerd-level, gives importance to the next technology a person buys. The survey from mozila, let the user arrange 10 different options in the order of their willing. We wanted to utilize the order as well as find its correlation with nerd-level. As we wanted to scale based on the order, we decided to use the weighted sum based on the ordering i.e., if a person orders something as first, it gets larger weights [1] and if they order least important they get smaller weights [0.1]. We limited the weights to a range (0.1,1).

We found a discrepancy in the distribution of the nerd-level. The following graph represents the distribution. We have a feild nan if a person failed to answer the particular question of nerd level.

![GitHub Logo](Nerd-level distribution.png)
<!-- Format: ![Alt Text](url) -->
