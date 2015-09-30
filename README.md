# parle
*a webapp for checking Canadian member of parliament voting records*

Democracies are defined by the laws that they pass, and the laws that pass are determined by the representatives we elect. In order to accurately evaluate whether our elected members of parliament are appropriately representing their electorate, the most pertinent information we have is their voting history: which bills have they voted for, which have they voted against, and which have they abstained from voting on.

While this information is made publicly available to all Canadians, we noticed that it can be slow and difficult to parse. Every bill is voted on multiple times - sometimes to pass amendments, sometimes even just to vote on whether or not it will be discussed. Unless you are able to dedicate significant time and effort into becoming well-versed on the details of each bill, attempting to analyze the votes a politician makes can be more confusing than informative.

As engaged citizens who are not capable of being intimately familiar with the details and progress every bill, what we wanted to know was this: after all the amendments and edits, did the politician vote to make the final bill a law or not?

That is what this app provides: for every member of parliament, it returns only the votes that correspond to their final vote on a bill as well as whether or not the bill was successfully passed into law.

We hope that this provides an easy additional avenue for evaluating the performance of our elected members of parliament and determining their effectiveness in representing our views.

## tech

The app uses React for the front-end and Flask to provide the data in JSON.

## database

This repository does not contain the database of parliamentary voting records. The database used can be found at [openparliament.ca](http://openparliament.ca/data-download/)
