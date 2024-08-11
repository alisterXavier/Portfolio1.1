  // if (currentIndex >= 0) {
        //   tl.to(sections[currentIndex].querySelectorAll('.about_image'), {
        //     yPercent: direction * -100,
        //     opacity: 0,
        //   }).to(
        //     new SplitType(
        //       sections[currentIndex].querySelectorAll(
        //         '.about_name'
        //       )! as TargetElement
        //     ).chars,
        //     {
        //       yPercent: direction * -100,
        //       opacity: 0,
        //       autoAlpha: 0,
        //       stagger: {
        //         amount: 0.09,
        //         from: 'random',
        //       },
        //     },
        //     0
        //   );
        // }

        // tl.fromTo(
        //   sections[index].querySelectorAll('.about_image'),
        //   {
        //     yPercent: direction * 100,
        //     opacity: 0,
        //   },
        //   {
        //     yPercent: 0,
        //     opacity: 1,
        //     duration: 1,
        //   },
        //   '-=.9'
        // )
        //   .fromTo(
        //     sections[index].querySelectorAll('.about_name'),
        //     { autoAlpha: 0 },
        //     { autoAlpha: 1 },
        //     '-=.9'
        //   )
        //   .fromTo(
        //     new SplitType(
        //       sections[index].querySelectorAll('.about_name')! as TargetElement
        //     ).chars,
        //     {
        //       yPercent: direction * 100,
        //       opacity: 0,
        //     },
        //     {
        //       yPercent: 0,
        //       opacity: 1,
        //       duration: 1,
        //       stagger: {
        //         amount: 0.09,
        //         from: 'random',
        //       },
        //     },
        //     '-=.9'
        //   );