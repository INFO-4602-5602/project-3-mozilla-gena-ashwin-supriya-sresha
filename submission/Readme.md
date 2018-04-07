

<h1>Project 3: Visualizing Mozilla Survey Data</h1>
<h2>Ashwin Sankaralingam, Gena Welk, Sreesha Nath, Supriya Naidu</h2>

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

<h3>Visualization 3 : Predicting the Nerdiness of a user given the number of technical terms they know</h3>
For the task at hand, we got a true count of the users that lay in each group of technical nerdiness(self-declared). We wanted to understand their interpretation of knowledge required to qualify as nerds. To do so, we did some data preprocessing to get the average and standard deviation on count of words users from each group knew. Based on that we came up with the following numbers: >=6 : Ultra Nerd, >=3 : Technically Savvy, >=1 : Average User, 0 : Luddite. To enable the consumers of our visualization to see where they stand, we provided that question next to the distribution graph for them to answer and see how faired. If you want to retake the quiz, you just have to hit the refresh button on there.

<h3>Visualization 4 : Distribution of people who fear loss of privacy with more online connectivity and who do they trust to ensure privacy</h3>

<h4>The Line Graph</h4>

For this visualization, we examined the answers to survey question 5.  The original question was: What is your biggest fear as we move towards a more connected future?<br/>
<ul>
<li>The loss of privacy 80,717 (41.9%)</li>
<li>We’ll be less safe 26,317 (13.66%)</li>
<li>We’ll lose touch with one another 42,877 (22.26%)</li>
<li>I have no fears about a more connected future 13, 083 (6.79%)</li>
<li>Other 15,740  (8.17%)</li>
<li>No answer 13.919 (7.22%)</li>
</ul>

For the users who described their “biggest fear as we move towards a more connected future” as “the loss of privacy”, our line graph depicts how many of them were:<br/>
<ul>
<li>Ultra Nerds: 10205 (12.6%)</li>
<li>Technically Savvy: 35132 (43.5%)</li>
<li>Average User: 32229 (39.9%)</li>
<li>Luddite: 2343 (2.9%)</li>
<li>Undescribed: 808 (0.01%)</li>
</ul>

<h4>The Bar Graph</h4>
The above line graph gives the viewer the option to click on one of the points.  When the viewer selects a point, the selected point produces a bar graph showing the answer to Survey Question 7: “Who do you most trust to help you learn how to protect your safety, security and privacy online?”<br/>
<ul>
<li>The makers of connected devices and apps </li>
<li>My friends and family</li>
<li>Non-profit organizations like Mozilla and Consumer Reports</li>
<li>The government</li>
<li>The media</li>
 </ul>
 <br/>

<h2>Above and Beyond:</h2> 
<ul>
<li>Semantic Zoom: We did explore multiple levels of information in viz1, viz2, and viz4. When you click on a sqaure on viz1 you can see the global ditribution of people of a paticular nerdiness favouring a particular feature. In viz4 you can see the distribution of the users of a specific nerdiness over the factors they trust to protect their privacy.</li>
<li>Missing Data: In viz2, the countries dont have any associated distribution data are marked in black. In viz 4 we have incorporated a new data value for nerdiness, "undescribed", for those people that didnt wish to declare their level of nerdiness. We have also included an additional "unanswered" in the bar chart data to depict the count of people that did not actually answer that question.</li>
<li>Perceptually-Informed Design: In viz 1 and viz 2 we have used hues to depict the variation in count. In viz 3 we have created a pop out by placing a red dot at the position you lie once you've answered the quiz.</li>
<li>Coordinated Views: There is a coordination between viz1 and viz2. As you click on a cell in viz1, viz2 get updated accordingly. In viz4 there is a coordination between both the graphs. As you click on a point in the line grpah, the bar chart gets updated.</li>
</ul>

<h3>Team Roles</h3>
<b>Ashwin: </b> Data preprocessing, d3 visualization, reporting<br/>
<b>Gena: </b> Data preprocessing, d3 visualization, reporting<br/>
<b>Sreesha: </b> Data preprocessing, d3 visualization,  reporting<br/>
<b>Supriya: </b>d3 visualization, reporting<br/>

<h3>How to Run</h3>
You can open the 'submission' folder and run the index.html file in a web browser of your choice.
