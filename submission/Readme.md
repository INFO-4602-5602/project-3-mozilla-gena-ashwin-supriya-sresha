


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

Viz 4

Viz4-1: “The Line Graph”

For this visualization, we examined the answers to survey question 5.  The original question was: What is your biggest fear as we move towards a more connected future?
The loss of privacy 80,717 (41.9%)
We’ll be less safe 26,317 (13.66%)
We’ll lose touch with one another 42,877 (22.26%)
I have no fears about a more connected future 13, 083 (6.79%)
Other 15,740  (8.17%)
No answer 13.919 (7.22%)

[viz4-line.csv: The source data for this line graph was a simple csv with 2 columns, “NerdLevel” and “Count”, and 5 rows of data.]

For the users who described their “biggest fear as we move towards a more connected future” as “the loss of privacy”, our line graph depicts how many of them were:
Ultra Nerds: 10205 (12.6%)
Technically Savvy: 35132 (43.5%)
Average User: 32229 (39.9%)
Luddite: 2343 (2.9%)
Undescribed: 808 (0.01%)

Viz4-2: “The Bar Graph”
The above line graph gives the viewer the option to click on one of the points.  When the viewer selects a point, the selected point produces a bar graph showing the answer to Survey Question 7: “Who do you most trust to help you learn how to protect your safety, security and privacy online?”
The makers of connected devices and apps
 My friends and family
 Non-profit organizations like Mozilla and Consumer Reports
 The government
 The media

[viz4-bar.json: The source data for this line graph was created from a simple csv with 3 columns, “nerdLevel”, “trust” and “trustCount”, and 35 rows of data summarized from the original 192K records.]

Where do UltraNerds (who fear privacy loss the most) turn for help on how to protect themselves online?:
5,592 trust non-profits
2,132 are unsure
1,264 trust creators
650 trust friends and family
250 trust  the media
168 trust the government
149 did not answer

Where do Technically Savvy (who fear privacy loss the most) turn for help on how to protect themselves online?:

16,795 trust non-profits
8,043 are unsure
4,776 trust creators
3,395 trust friends and family
1098 trust  the media
671 trust the government
354 did not answer

Where do Average Users (who fear privacy loss the most) turn for help on how to protect themselves online?:

12,635 trust non-profits
8,902 are unsure
4,161 trust creators
4,807 trust friends and family
753 trust  the media
638 trust the government
333 did not answer

Where do Luddites (who fear privacy loss the most) turn for help on how to protect themselves online?:

601 trust non-profits
957 are unsure
241 trust creators
408 trust friends and family
34 trust the media
59 trust the government
43 did not answer

