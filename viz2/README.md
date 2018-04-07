

<h3> Visualization 1 : Heat Map of Nerd-level vs the Features each person gives Importance to. </h3>
For the task of understanding what each person in Nerd-level, gives importance to the next technology a person buys. The survey from mozila, let the user arrange 10 different options in the order of their willing. We wanted to utilize the order as well as find its correlation with nerd-level. As we wanted to scale based on the order, we decided to use the weighted sum based on the ordering i.e., if a person orders something as first, it gets larger weights [1] and if they order least important they get smaller weights [0.1]. We limited the weights to a range (0.1,1).

We found a discrepancy in the distribution of the nerd-level. The following graph represents the distribution. We have a feild nan if a person failed to answer the particular question of nerd level.

![GitHub Logo](https://github.com/INFO-4602-5602/project-3-mozilla-gena-ashwin-supriya-sresha/blob/master/Nerd-level%20distribution.png)

We **normalised** the weighted score based on order, so that we do not get affected by imbalanced dataset. So now we have a weighted average of the importance a person gives to an option for a new technology

>Weighted average for a particular Nerd_level for a particular option = Sum(Weight based on the order)/ Number of people in >particular nerd level

Each box in the heat map represents the distribution of the response across the whole world.

_References_ : [heatmap](http://bl.ocks.org/tjdecke/5558084)


<h3> Visualization 2 : World distribution of Nerd-level for a particular feature option. </h3>
This is an extenstion from previous visualization with the calculation of the weighted average in the similar fashion. So it is dependent on Viz 1, and on selection of any particular box, it repopulated the world map with regions having distribution for that particular country normalised by the number of people in the nerd-level who took the survey from that country. This makes sure, not to over weigh the responses from heavily populated countries like China, India , USA and give equal importance to the responses from the country.

It is particularly interesting to see responses from most of the countries and looking at the distribution will give a sense to the technology companies on what to prefer in a particular country for a particular type of nerd-level. Eventually, if a company concentrates on delivering what a user expects, the product will be hit and with more details on country distribution, it gives more market information.

_Difficulties_ : For the purpose of maps in d3, I chose to use d3's json version of loading the map (topojson maps). By the present, the topologies of the each country was given a country code and a name. The data from mozilla did not match in country name or the code. To get across this difficulty, I decided to find and replace the mismatched to countries to the format JSON accepts.

_References_ : [topomaps](http://bl.ocks.org/micahstubbs/c14d8bda8e337da6c836a526ad1a7c5a)
