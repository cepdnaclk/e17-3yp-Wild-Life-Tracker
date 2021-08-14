import React from 'react';
import './styles.css';

export default function Template(props) {

/*

Template - desktop view

-------------------------
|left(40%)|   right(60%)|
|         |             |
|         |             |
|         |             |
|         |             |
|         |             |
|         |             |
|         |             |
|         |             |
|         |             |
-------------------------
   (blue)    (white)


Template - mobile view

-------------------------
|     WildLife           | 
|      Tracker           | (blue)
-------------------------
|                        |
|                        |
|                        |
|                        |
|                        | (white)
|                        |
|                        |
|                        |
|                        |
|                        |
--------------------------


*/
  return (
    <div className="container-fluid h-100">
    <div className="row min-vh-100 flex-column flex-md-row">

        <aside className="col-12 col-md-4 p-0 bg-primary flex-shrink-1">
            <div className="text-center logo">
              	{props.left}
            </div>
        </aside>

        <main className="col">
          <div className="form">
                {props.right}
          </div>          
        </main>
    </div>
</div>
  );
}