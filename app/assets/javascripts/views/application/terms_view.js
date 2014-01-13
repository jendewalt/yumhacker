TermsView = Backbone.View.extend({
    events: {
        'click a.toggle': 'toggleTerms'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/terms'));
        window.scrollTo(0,0);
        this.startStream();
    },

    toggleTerms: function () {
        $('canvas').hide();
        $('.toggle').hide();
        $('.boring_terms').show();            
    },

    startStream: function () {
        var canvas = $('canvas')[0];
        var ctx = canvas.getContext('2d');
        var height = 700;
        var width = 800;
        var words = [];
        var acceleration = 0.0001;
        var time_interval = 70;
        var tos = this.tos

        canvas.height = height;
        canvas.width = width;

        function Word(word) {
            this.word = word;
            this.y = 30;
            this.y0 = 30;
            this.x = width / 2;
            this.color = '#313136',
            this.time = 0;

            this.draw = function () {
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = this.color;
                ctx.font = '20px Arial';
                ctx.fillText(this.word, this.x, this.y);
            };
        };

        function makeWord(word) {
            words.push(new Word(word));
        };

        function evolveWords() {
            _.each(words, function (word) {
                if (word.y >= height - 50) {
                    word.y = height - 30;
                } else {
                    word.y = word.y0 + 0.5 * acceleration * Math.pow(word.time, 2);
                    word.time += time_interval;
                    word.color = 'rgba(0,0,0,0.3)';
                }
            });
        };

        function drawWords() {
            _.each(words, function (word) {
                word.draw();
            });

            evolveWords();
        };

        function paintScreen() {
            if (words.length < tos.length) {
                makeWord(tos[words.length]);
            }

            ctx.clearRect(0,0,width, height);
            drawWords();
            setTimeout(paintScreen, time_interval);
        };

        paintScreen();
    },

    tos: "Terms of Service:   The following terms and conditions govern all use of the yumhacker.com website and all content, services and products available at or through the website (the Website). The Website is owned and operated by YumHacker. (“YumHacker”). The Website is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, YumHacker’s Privacy Policy) and procedures that may be published from time to time on this Site by YumHacker (collectively, the “Agreement”). Please read this Agreement carefully before accessing or using the Website. By accessing or using any part of the web site, you agree to become bound by the terms and conditions of this agreement. If you do not agree to all the terms and conditions of this agreement, then you may not access the Website or use any services. If these terms and conditions are considered an offer by YumHacker, acceptance is expressly limited to these terms. Your yumhacker.com Account and Site. If you create an account on the Website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account. You must not describe or assign keywords to your account in a misleading or unlawful manner, including in a manner intended to trade on the name or reputation of others, and YumHacker may change or remove any description or keyword that it considers inappropriate or unlawful, or otherwise likely to cause YumHacker liability. You must immediately notify YumHacker of any unauthorized uses of your account, your account or any other breaches of security. YumHacker will not be liable for any acts or omissions by You, including any damages of any kind incurred as a result of such acts or omissions. Responsibility of Contributors. If you operate an account, comment on a account, post material to the Website, post links on the Website, or otherwise make (or allow any third party to make) material available by means of the Website (any such material, “Content”), You are entirely responsible for the content of, and any harm resulting from, that Content. That is the case regardless of whether the Content in question constitutes text, graphics, an audio file, or computer software. By making Content available, you represent and warrant that: the downloading, copying and use of the Content will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark or trade secret rights, of any third party; if your employer has rights to intellectual property you create, you have either (i) received permission from your employer to post or make available the Content, including but not limited to any software, or (ii) secured from your employer a waiver as to all rights in or to the Content; you have fully complied with any third-party licenses relating to the Content, and have done all things necessary to successfully pass through to end users any required terms; the Content does not contain or install any viruses, worms, malware, Trojan horses or other harmful or destructive content; the Content is not spam, is not machine- or randomly-generated, and does not contain unethical or unwanted commercial content designed to drive traffic to third party sites or boost the search engine rankings of third party sites, or to further unlawful acts (such as phishing) or mislead recipients as to the source of the material (such as spoofing); the Content is not pornographic, does not contain threats or incite violence, and does not violate the privacy or publicity rights of any third party; your account is not getting advertised via unwanted electronic messages such as spam links on newsgroups, email lists, other accounts and web sites, and similar unsolicited promotional methods; your account is not named in a manner that misleads your readers into thinking that you are another person or company. For example, your account’s URL or name is not the name of a person other than yourself or company other than your own; and you have, in the case of Content that includes computer code, accurately categorized and/or described the type, nature, uses and effects of the materials, whether requested to do so by YumHacker or otherwise. By submitting Content to YumHacker for inclusion on your Website, you grant YumHacker a world-wide, royalty-free, and non-exclusive license to reproduce, modify, adapt and publish the Content solely for the purpose of displaying, distributing and promoting your account. If you delete Content, YumHacker will use reasonable efforts to remove it from the Website, but you acknowledge that caching or references to the Content may not be made immediately unavailable. Without limiting any of those representations or warranties, YumHacker has the right (though not the obligation) to, in YumHacker’s sole discretion (i) refuse or remove any content that, in YumHacker’s reasonable opinion, violates any YumHacker policy or is in any way harmful or objectionable, or (ii) terminate or deny access to and use of the Website to any individual or entity for any reason, in YumHacker’s sole discretion. YumHacker will have no obligation to provide a refund of any amounts previously paid. Responsibility of Website Visitors. YumHacker has not reviewed, and cannot review, all of the material, including computer software, posted to the Website, and cannot therefore be responsible for that material’s content, use or effects. By operating the Website, YumHacker does not represent or imply that it endorses the material there posted, or that it believes such material to be accurate, useful or non-harmful. You are responsible for taking precautions as necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. The Website may contain content that is offensive, indecent, or otherwise objectionable, as well as content containing technical inaccuracies, typographical mistakes, and other errors. The Website may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated. YumHacker disclaims any responsibility for any harm resulting from the use by visitors of the Website, or from any downloading by those visitors of content there posted. Content Posted on Other Websites. We have not reviewed, and cannot review, all of the material, including computer software, made available through the websites and webpages to which yumhacker.com links, and that link to yumhacker.com. YumHacker does not have any control over those non-yumhacker.com websites and webpages, and is not responsible for their contents or their use. By linking to a non-yumhacker.com website or webpage, YumHacker does not represent or imply that it endorses such website or webpage. You are responsible for taking precautions as necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. YumHacker disclaims any responsibility for any harm resulting from your use of non-yumhacker.com websites and webpages. Copyright Infringement and DMCA Policy. As YumHacker asks others to respect its intellectual property rights, it respects the intellectual property rights of others. If you believe that material located on or linked to by yumhacker.com violates your copyright, you are encouraged to notify YumHacker in accordance with YumHacker’s Digital Millennium Copyright Act (“DMCA”) Policy. YumHacker will respond to all such notices, including as required or appropriate by removing the infringing material or disabling all links to the infringing material. YumHacker will terminate a visitor’s access to and use of the Website if, under appropriate circumstances, the visitor is determined to be a repeat infringer of the copyrights or other intellectual property rights of YumHacker or others. In the case of such termination, YumHacker will have no obligation to provide a refund of any amounts previously paid to YumHacker. Intellectual Property. This Agreement does not transfer from YumHacker to you any YumHacker or third party intellectual property, and all right, title and interest in and to such property will remain (as between the parties) solely with YumHacker. YumHacker, yumhacker, yumhacker.com, the yumhacker.com logo, and all other trademarks, service marks, graphics and logos used in connection with yumhacker.com, or the Website are trademarks or registered trademarks of YumHacker or YumHacker’s licensors. Other trademarks, service marks, graphics and logos used in connection with the Website may be the trademarks of other third parties. Your use of the Website grants you no right or license to reproduce or otherwise use any YumHacker or third-party trademarks. Advertisements. YumHacker reserves the right to display advertisements on your account. Changes. YumHacker reserves the right, at its sole discretion, to modify or replace any part of this Agreement. It is your responsibility to check this Agreement periodically for changes. Your continued use of or access to the Website following the posting of any changes to this Agreement constitutes acceptance of those changes. YumHacker may also, in the future, offer new services and/or features through the Website (including, the release of new tools and resources). Such new features and/or services shall be subject to the terms and conditions of this Agreement. Termination. YumHacker may terminate your access to all or any part of the Website at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate this Agreement or your yumhacker.com account (if you have one), you may simply discontinue using the Website. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability. Disclaimer of Warranties. The Website is provided “as is”. YumHacker and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither YumHacker nor its suppliers and licensors, makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, the Website at your own discretion and risk. Limitation of Liability. In no event will YumHacker, or its suppliers or licensors, be liable with respect to any subject matter of this agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data; or (iv) for any amounts that exceed the fees paid by you to YumHacker under this agreement during the twelve (12) month period prior to the cause of action. YumHacker shall have no liability for any failure or delay due to matters beyond their reasonable control. The foregoing shall not apply to the extent prohibited by applicable law. General Representation and Warranty. You represent and warrant that (i) your use of the Website will be in strict accordance with the YumHacker with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside) and (ii) your use of the Website will not infringe or misappropriate the intellectual property rights of any third party. Indemnification. You agree to indemnify and hold harmless YumHacker, its contractors, and its licensors, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys’ fees, arising out of your use of the Website, including but not limited to your violation of this Agreement. Miscellaneous. This Agreement constitutes the entire agreement between YumHacker and you concerning the subject matter hereof, and they may only be modified by a written amendment signed by an authorized executive of YumHacker, or by the posting by YumHacker of a revised version. Except to the extent applicable law, if any, provides otherwise, this Agreement, any access to or use of the Website will be governed by the laws of the state of California, U.S.A., excluding its conflict of law provisions, and the proper venue for any disputes arising out of or relating to any of the same will be the state and federal courts located in San Francisco County, California. Except for claims for injunctive or equitable relief or claims regarding intellectual property rights (which may be brought in any competent court without the posting of a bond), any dispute arising under this Agreement shall be finally settled in accordance with the Comprehensive Arbitration Rules of the Judicial Arbitration and Mediation Service, Inc. (“JAMS”) by three arbitrators appointed in accordance with such Rules. The arbitration shall take place in San Francisco, California, in the English language and the arbitral decision may be enforced in any court. The prevailing party in any action or proceeding to enforce this Agreement shall be entitled to costs and attorneys’ fees. If any part of this Agreement is held invalid or unenforceable, that part will be construed to reflect the parties’ original intent, and the remaining portions will remain in full force and effect. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. You may assign your rights under this Agreement to any party that consents to, and agrees to be bound by, its terms and conditions; YumHacker may assign its rights under this Agreement without condition. This Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns.".split(' ')

});
