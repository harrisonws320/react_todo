import React from 'react';
import './About.css';

export default function About() {
  const redirectToUrl = () => {
    window.open('http://harrisonwsmith.com/', '_blank');
  };

  return (
    <section className="categories">
      <article className="bg-light p-5">
        <h1 className='text-center'>
          <span className='custom-heading'>My name's Harrison Smith</span>
        </h1>
      </article>

      <div className="bg-dark p-2 mb-3 text-center">
        <button
          className="btn btn-danger text-white p-3 mb-3"
          onClick={redirectToUrl}
        >
          Thanks for stopping by!
        </button>
      </div>

      <br />
      <br />
      <br />

      <p>
        I was born in Salem, Massachusetts and have lived in Boston, Scotland, Kansas, Russia, and New York City. I currently reside in Kansas City, MO.
      </p>

      <p>
        From 5th to 10th grade, I practiced kickboxing and won two state titles. Then I began training in MMA and Brazilian jiu-jitsu.
      </p>

      <p>
        I studied Russian at The University of Kansas because I was fascinated by its history and loved the writing of Dostoevsky and Nabokov.
      </p>

      <p>
        I was accepted into Columbia's PhD program, where I earned my MA in Russian. I also studied philosophy and religion.
      </p>

      <p>
        I wrote my MA thesis on Dostoevsky and presented independent research at other elite universities, like Princeton and Yale.
      </p>

      <strong><em>Now the next chapter of my life as a web developer begins.</em></strong>

      <br />
      <br />
      <br />
    </section>
  );
}