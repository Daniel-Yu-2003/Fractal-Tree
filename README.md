Fractal Tree Simulator

This is a user interactable fractal tree simulation built using React and Typescript. It generates fractal trees with parameters and animation settings that the user can change.
Features include generating a fractal tree using recursion and math formulas for the specific angles, sizes, and lengths, adjustable variables for all aspects of the tree, adjustable animation speed with animation stop and continue options. 
The most important feature is that the app with its variables are updated in real time so all changes that user makes with variables are seen immediately without delays.

Project structure includes the basic deployed app.tsx file that includes the headings and also mainly imports the main fractal tree component. 
Then there is the fractal tree file that contains all of the information, variables, and logic that are related with the fractal tree such as the tree itself and the variable changing fields.
The main component of the fractal tree is the branch component which uses every changable variable and is a recursive component that calls itself twice at each return for each branch split.
Other important implemenations include the mathematical trigonometry formulas used to calculate the position of the branches, and the uses of the React useState and useEffect hooks to manage the state of variables.

Memory usage for the app heavily depends on the depth of the tree as the memory contains more components the larger the tree is. 
The performance for the memory and rendering speed is generally good for depth levels of 1-10, but as the depth goes over 10, performace issues start to happen as there are over 1000 branches.
The update speed for the fractal tree depends on the set animation speed and there are generally no delays between depth levels of 1-10, but lag starts to happen over depth level 10.
