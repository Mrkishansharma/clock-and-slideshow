import data from "../../submissionData.json"; // do not create this file
// let data = [{ submission_link: "http://localhost:8080/", id: 67890 }];
describe("Test", function () {
  let acc_score = 1;

  data.map(({ submission_link: url, id }) => {
    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }

    var movieImages = [
      "https://www.themoviedb.org/t/p/w220_and_h330_face/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
      "https://images.indianexpress.com/2022/06/major-movie-review-1200.jpg",
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/2607/1062607-h-fa693eabb41d",
      "https://lumiere-a.akamaihd.net/v1/images/p_aladdin2019_17638_d53b09e6.jpeg",
      "https://igimages.gumlet.io/hindi/gallery/movies/tubelight/tubelight_poster.jpg?w=160&dpr=2.6"
    ]

    it(`check if default image is set for the slideshow`, () => {
      cy.visit(url);
      cy.get("#slideshow").children().should("have.length", 1);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`check if slideshow is changing images correctly on intervals of 2 seconds - 1`, () => {
      cy.visit(url);

      cy.get('#slideshow')
      .find('img')
      .first()
      .should('have.attr', 'src')
      .then(src => {
         expect(src).to.equal(movieImages[0]);
      });


      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`check if slideshow is changing images correctly on intervals of 2 seconds - 2`, () => {
      cy.clock()
      cy.visit(url);

      cy.tick(2000)
      cy.get('#slideshow' )
      .find('img')
      .first()
      .should('have.attr', 'src')
      .then(src => {
        expect(src).to.equal(movieImages[1]);
      });


      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`check if slideshow is changing images correctly on intervals of 2 seconds - 3`, () => {
      cy.clock()
      cy.visit(url);

      cy.tick(4000)
      cy.get('#slideshow' )
      .find('img')
      .first()
      .should('have.attr', 'src')
      .then(src => {
        expect(src).to.equal(movieImages[2]);
      });


      cy.then(() => {
        acc_score += 2;
      });
    });


    it(`check if the slideshow restarts after the last image`, () => {
      cy.clock()
      cy.visit(url);

      cy.tick(10000)
      cy.get('#slideshow' )
      .find('img')
      .first()
      .should('have.attr', 'src')
      .then(src => {
        expect(src).to.equal(movieImages[0]);
      });


      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`generate score`, () => {
      //////////////
      let result = {
        id,
        marks: acc_score,
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});