#  uBlock Origin filters for Substack and Substack-based websites 

How to use the script:

First, edit the `DOMAINS` list in the script to have the Substack-based site
domains that you want the filters to be active on.  The list is already
filled out with the domains that I personally use, but you probably want
to add or remove stuff from the list.

Second, run the script using Python like this:

```bash
$ python3 generate.py
```

You can see what the output looks like
[here](https://raw.githubusercontent.com/riceissa/ublock-origin-substack/refs/heads/master/sample-output.txt).

Third, copy-paste the output into the "My filters" tab in uBlock origin.
