'use strict';
const $=id=>document.getElementById(id);
const GAN='甲乙丙丁戊己庚辛壬癸', ZHI='子丑寅卯辰巳午未申酉戌亥', KGAN='갑을병정무기경신임계', KZHI='자축인묘진사오미신유술해';
const ELEMENTS=['목','화','토','금','수'], COLORS=['#648b63','#c36c52','#bba15d','#89999e','#5e849f'];
const GE=[0,0,1,1,2,2,3,3,4,4], ZE=[4,2,0,0,2,1,1,2,3,3,2,4];
const PERSONAL=['성장과 새로운 시도에 관심이 가는 목의 상징입니다. 계획을 작은 행동으로 옮겨보세요.','표현과 교류를 중시하는 화의 상징입니다. 열정과 휴식의 리듬을 함께 살펴보세요.','기반과 신뢰를 중시하는 토의 상징입니다. 꾸준함을 살리되 변화할 여지도 남겨보세요.','기준과 정리를 중시하는 금의 상징입니다. 명확함에 유연한 소통을 더해보세요.','관찰과 배움을 중시하는 수의 상징입니다. 생각을 기록하고 한 가지씩 실행해보세요.'];
const THEMES=[
{title:'동료와 함께 기반을 다지는 해',text:'같은 기운을 만나는 비겁의 흐름입니다. 협업과 자기 기준을 돌아보는 주제로 읽을 수 있습니다.',money:'공동 지출과 개인 지출을 구분하고 예산을 명확히 정해보세요.',work:'동료와 역할을 나누고 자신의 강점을 정리하는 데 집중해보세요.',love:'비교보다 서로의 개성을 존중하는 대화가 도움이 됩니다.',well:'일정이 겹칠 때 휴식 시간을 먼저 확보해보세요.'},
{title:'생각을 밖으로 표현하는 해',text:'내 기운이 다음 기운을 만드는 식상의 흐름입니다. 창작과 표현, 결과물을 만드는 주제로 읽습니다.',money:'새 아이디어는 작은 비용으로 검증하고 지출 기록을 남겨보세요.',work:'배운 것을 글이나 프로젝트로 만들어 보여주세요.',love:'느끼는 마음을 구체적인 말로 전하되 상대의 말도 들어보세요.',well:'활동 시간을 늘릴 때 수면 리듬도 함께 지켜보세요.'},
{title:'자원과 선택을 점검하는 해',text:'내 기운이 제어하는 재성의 흐름입니다. 자원 관리와 우선순위를 살피는 주제로 읽습니다.',money:'수익을 예언하는 의미는 아닙니다. 예산·분산·위험 한도를 점검해보세요.',work:'목표를 수치로 정하고 투입 시간과 결과를 비교해보세요.',love:'시간과 관심을 어떻게 나눌지 함께 이야기해보세요.',well:'성과를 좇느라 식사와 휴식을 건너뛰지 않도록 해보세요.'},
{title:'책임과 기준을 세우는 해',text:'나를 제어하는 관성의 흐름입니다. 책임과 약속, 사회적 역할을 돌아보는 주제로 읽습니다.',money:'계약 조건과 고정비를 꼼꼼히 확인해보세요.',work:'해야 할 일의 범위를 명확히 하고 우선순위를 정해보세요.',love:'기대하는 바를 미리 말하고 무리한 약속은 줄여보세요.',well:'부담이 쌓이면 도움을 요청하고 쉬는 시간을 확보해보세요.'},
{title:'배움과 회복에 힘을 주는 해',text:'나를 돕는 인성의 흐름입니다. 공부와 지원, 내적 기반을 살피는 주제로 읽습니다.',money:'학습 비용은 목적과 예산을 정한 뒤 지출해보세요.',work:'새 기술을 배우고 믿을 만한 조언을 구해보세요.',love:'문제를 바로 해결하기보다 먼저 경청해보세요.',well:'규칙적인 수면과 가벼운 활동으로 생활 리듬을 돌아보세요.'}
];
function relation(day,other){if(day===other)return 0;if((day+1)%5===other)return 1;if((day+2)%5===other)return 2;if((other+2)%5===day)return 3;return 4;}
function korean(pair){return [...pair].map(c=>GAN.includes(c)?KGAN[GAN.indexOf(c)]:KZHI[ZHI.indexOf(c)]).join('');}
function pillars(y,m,d,h,min,sect=2,unknown=false){
 const s=Solar.fromYmdHms(y,m,d,h,min,0),e=s.getLunar().getEightChar();e.setSect(sect);
 const shifted=new Date(Date.UTC(y,m-1,d,h-1,min));
 const boundary=Solar.fromYmdHms(shifted.getUTCFullYear(),shifted.getUTCMonth()+1,shifted.getUTCDate(),shifted.getUTCHours(),min,0).getLunar().getEightChar();
 return {pairs:[boundary.getYear(),boundary.getMonth(),e.getDay(),unknown?null:e.getTime()],solar:s};
}
function escapeHtml(t){return t.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

const ELEMENT_DETAIL=[
 ['성장 · 기획 · 확장','새로운 목표를 세우고 발전 가능성을 찾는 이미지입니다.','아이디어를 많이 시작하느라 마무리가 늦어지는지 돌아보세요.','이번 주에 끝낼 목표 한 가지를 정하고 완료한 뒤 다음 단계로 넘어가세요.'],
 ['표현 · 열정 · 연결','관심을 표현하고 사람들과 교류하는 이미지입니다.','의욕이 앞설 때 상대의 속도를 놓치거나 일정을 과하게 잡는지 살펴보세요.','중요한 말을 하기 전 한 번 정리하고 활동 사이에 여유 시간을 남겨보세요.'],
 ['안정 · 신뢰 · 조율','기반을 다지고 관계와 일의 중심을 지키는 이미지입니다.','익숙한 방식에 머물거나 남의 부탁을 지나치게 떠안는지 돌아보세요.','지킬 약속과 거절할 요청을 구분하고 작은 변화를 한 가지 시도해보세요.'],
 ['기준 · 결단 · 정리','불필요한 것을 덜어내고 명확한 기준을 만드는 이미지입니다.','완벽한 기준 때문에 시작이 늦어지거나 말이 단정적으로 들리는지 살펴보세요.','필수 기준 세 개만 정하고 상대의 사정을 묻는 질문을 함께 사용해보세요.'],
 ['관찰 · 탐구 · 유연함','흐름을 살피고 정보를 모으며 상황에 맞추는 이미지입니다.','생각과 정보 수집이 길어져 결정을 미루는지 돌아보세요.','조사할 시간을 정하고 알아낸 내용을 작은 행동으로 확인해보세요.']
];
const REL_NAMES=['비겁','식상','재성','관성','인성'];
const REL_REASON=['두 오행이 같습니다. 전통 해석에서는 나와 비슷한 존재, 동료와 자기 주도성의 주제로 연결합니다.','일간 오행이 상대 오행을 생합니다. 안의 생각을 밖으로 표현하고 결과물을 만드는 주제로 연결합니다.','일간 오행이 상대 오행을 극합니다. 다루고 관리하는 대상, 자원과 현실적 선택의 주제로 연결합니다.','상대 오행이 일간 오행을 극합니다. 나를 규율하는 기준, 책임과 사회적 역할의 주제로 연결합니다.','상대 오행이 일간 오행을 생합니다. 나를 지원하는 배움, 조언과 회복의 주제로 연결합니다.'];
const ACTIONS=[
 ['공동 비용은 부담 비율과 정산일을 미리 정해보세요.','팀 과제에서 담당 범위와 완료 기준을 문장으로 합의해보세요.','상대와 나의 차이를 평가하기보다 원하는 도움을 구체적으로 말해보세요.','모임과 개인 휴식이 한쪽으로 치우치지 않는지 주간 일정을 살펴보세요.'],
 ['새 시도의 비용·기간·중단 기준을 기록하고 작은 실험부터 해보세요.','완벽한 준비를 기다리기보다 작은 결과물 한 개를 만들어 피드백을 받으세요.','말로 표현한 관심이 행동으로도 이어졌는지 돌아보세요.','집중 작업 후 잠깐 쉬는 시간을 일정에 포함해보세요.'],
 ['수입과 고정비, 예비자금을 구분해 한 달에 한 번 점검해보세요.','시간을 많이 쓰는 일과 실제 성과를 내는 일을 구분해보세요.','상대가 중요하게 여기는 시간을 묻고 현실적인 약속을 정해보세요.','성과 목표와 별개로 유지할 생활 습관 한 가지를 정해보세요.'],
 ['계약의 비용·기간·해지 조건을 읽고 모호한 부분은 확인해보세요.','긴급한 일과 중요한 일을 나누고 맡을 수 없는 범위는 미리 알리세요.','기대와 부담을 숨기지 말고 서로 가능한 약속을 이야기해보세요.','휴식도 지켜야 할 일정으로 정해 부담이 누적되는지 살펴보세요.'],
 ['교육과 도구 구매 전에 지금 필요한 이유와 사용 계획을 적어보세요.','배운 내용 중 실제 업무에 적용할 한 가지를 정해보세요.','조언하기 전에 상대가 공감과 해결 중 무엇을 원하는지 물어보세요.','편안함을 느끼는 활동을 찾고 꾸준히 가능한 일상 리듬을 만들어보세요.']
];
function detailedGuide(pairs,counts,day,annual,annualE,year){
 const idx=relation(day,annualE),el=ELEMENT_DETAIL[day],max=Math.max(...counts),min=Math.min(...counts);
 const high=ELEMENTS.filter((_,i)=>counts[i]===max).join('·'),low=ELEMENTS.filter((_,i)=>counts[i]===min).join('·');
 const meanings=[
 ['년주 · 배경을 보는 창','전통적으로 초기 환경과 가족·사회적 배경을 살피는 자리로 설명합니다. 실제 가족관계나 어린 시절 사건을 이 글자만으로 판단할 수는 없습니다.'],
 ['월주 · 활동 무대를 보는 창','태어난 절기와 계절을 담습니다. 전통 해석에서 사회 활동과 일하는 환경을 살피며, 월령의 영향은 정밀 감정에서 중요하게 다뤄집니다. 이 앱의 막대그래프는 그 가중치를 반영하지 않습니다.'],
 ['일주 · 나를 보는 창','위 글자인 일간을 해석의 중심으로 삼습니다. 아래 글자인 일지는 전통적으로 일상과 가까운 관계를 살피는 자리로 설명하지만, 배우자나 결혼의 결과를 단정하지 않습니다.'],
 ['시주 · 이어갈 방향을 보는 창','출생시간에서 정해지는 기둥입니다. 전통적으로 이후의 관심과 삶의 방향을 살피는 데 사용합니다. 자녀 유무나 노년의 사건을 확정하는 정보가 아니며 시간 미상일 때는 해석에서 제외합니다.']
 ];
 let html='<div class="card"><small>06 / 처음 읽는 사주</small><h2>네 기둥을 어떻게 읽을까요?</h2><p>사주팔자는 태어난 연·월·일·시를 각각 두 글자로 나타낸 네 기둥, 여덟 글자입니다. 각 기둥의 위는 천간, 아래는 지지이며 서로 다른 역할을 가진 상징으로 읽습니다.</p><div class="grid">'+meanings.map((v,i)=>'<div class="mini"><h3>'+v[0]+'</h3><p><strong>'+(pairs[i]?korean(pairs[i])+' ('+pairs[i]+')':'시간 미상 · 해석 제외')+'</strong></p><p>'+v[1]+'</p></div>').join('')+'</div><p class="note">이 설명은 전통 명리의 상징 체계를 쉽게 풀어쓴 것입니다. 글자와 실제 성격·인생 사건 사이에 입증된 인과관계가 있다는 뜻은 아닙니다.</p></div>';
 html+='<div class="card"><small>07 / 나를 돌아보는 해설</small><h2>일간 '+korean(pairs[2][0])+' · '+el[0]+'</h2><h3>어떤 상징인가요?</h3><p>'+el[1]+' 일간은 사주를 읽을 때 기준점으로 사용하며, 이것 하나로 성격 전체를 결정하지 않습니다.</p><h3>강점으로 살펴볼 질문</h3><p>최근 이 특징이 도움이 되었던 순간은 언제였나요? 일과 관계에서 잘했던 구체적인 행동 한 가지를 적어보세요.</p><h3>균형을 위해 돌아볼 점</h3><p>'+el[2]+'</p><h3>작은 실천</h3><p>'+el[3]+'</p></div>';
 html+='<div class="card"><small>08 / 오행을 자세히 이해하기</small><h2>숫자보다 중요한 균형의 의미</h2><p>현재 단순 집계에서 가장 많이 표시된 오행은 <strong>'+high+' ('+max+'개)</strong>, 가장 적게 표시된 오행은 <strong>'+low+' ('+min+'개)</strong>입니다. 동일한 개수인 오행은 모두 표시합니다.</p><p>많은 오행을 좋은 기운, 적은 오행을 나쁜 기운으로 해석하지 않습니다. 대표 오행이 0개여도 지지 내부의 지장간까지 없는 것은 아닙니다. 오행 개수만으로 신강·신약이나 용신을 정할 수도 없습니다.</p><div class="grid">'+ELEMENTS.map((v,i)=>'<div class="mini"><h3>'+v+' · '+ELEMENT_DETAIL[i][0]+'</h3><p>'+ELEMENT_DETAIL[i][1]+'</p><p>균형을 돌아보는 예: '+ELEMENT_DETAIL[i][3]+'</p></div>').join('')+'</div><h3>상생과 상극이란?</h3><p>상생은 목→화→토→금→수→목, 상극은 목→토→수→화→금→목의 관계로 설명합니다. 생은 돕고 이어주는 상징, 극은 조절하고 기준을 세우는 상징입니다. 생이 언제나 길하고 극이 언제나 흉하다는 의미는 아닙니다.</p></div>';
 html+='<div class="card"><small>09 / 올해 해석의 근거</small><h2>'+year+'년 '+korean(annual)+'년은 왜 이렇게 설명했나요?</h2><p>당신의 일간은 <strong>'+korean(pairs[2][0])+' · '+ELEMENTS[day]+'</strong>, 해당 연도의 천간은 <strong>'+korean(annual[0])+' · '+ELEMENTS[annualE]+'</strong>입니다. 이 두 대표 오행의 관계를 <strong>'+REL_NAMES[idx]+'</strong>라는 큰 주제로 묶었습니다.</p><p>'+REL_REASON[idx]+'</p><p class="note">십신을 음양에 따라 비견·겁재, 식신·상관, 정재·편재, 정관·편관, 정인·편인으로 세분하지 않습니다. 올해 지지와 원국 전체의 합충, 대운, 용신은 해설 생성에 사용하지 않습니다. 같은 일간 오행이라면 같은 연도 해설이 나옵니다.</p><div class="grid">'+['재물 · 확인할 행동','직장 · 시도할 행동','관계 · 대화할 주제','생활 · 유지할 습관'].map((v,i)=>'<div class="mini"><h3>'+v+'</h3><p>'+ACTIONS[idx][i]+'</p></div>').join('')+'</div><h3>올해의 기록 질문</h3><p>지금 가장 필요한 변화는 무엇인가요? 이번 달 실행할 행동 한 가지, 확인할 날짜, 완료 여부를 적어보세요. 한 달 뒤 운세 문장과 실제 경험을 비교해 자신에게 도움이 된 부분을 남겨보세요.</p></div>';
 return html;
}

function todayFortune(day){
 const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const [y,m,d]=date.split('-').map(Number),pair=Solar.fromYmdHms(y,m,d,12,0,0).getLunar().getEightChar().getDay();
 const other=GE[GAN.indexOf(pair[0])],idx=relation(day,other),theme=THEMES[idx];
 const investmentThemes=[
 '오늘의 비겁 해설은 주변 의견과 나의 기준을 구분하는 주제로 읽습니다. 다른 사람의 수익 인증이나 추천이 내 판단에 어떤 영향을 주는지 돌아보세요.',
 '오늘의 식상 해설은 생각을 기록하고 검토하는 주제로 읽습니다. 떠오른 투자 아이디어를 바로 실행하기보다 근거와 반대 사례를 함께 적어보세요.',
 '오늘의 재성 해설은 자원과 선택을 점검하는 주제로 읽습니다. 보유 자산을 얼마나 이해하고 있는지, 계획과 실제 행동이 일치하는지 돌아보세요. 재성은 수익을 보장하는 뜻이 아닙니다.',
 '오늘의 관성 해설은 기준과 약속을 확인하는 주제로 읽습니다. 스스로 정한 매매 규칙을 감정 때문에 바꾸고 있지는 않은지 살펴보세요.',
 '오늘의 인성 해설은 학습과 정보 확인을 중심으로 읽습니다. 새로운 정보의 출처를 확인하고 이해하지 못한 부분을 정리하는 시간을 가져보세요.'
 ];
 const investmentText=investmentThemes[idx]+'<br><strong>주식:</strong> 오늘 살펴본 종목의 투자 이유와 그 이유가 틀렸다고 판단할 조건을 기록해보세요.<br><strong>코인:</strong> 급등·급락이나 주변 이야기에 어떤 감정이 드는지 살펴보고, 충동적인 추격이나 손실 만회 심리를 구분해보세요.<br><strong>오늘의 투자 점검:</strong> 판단 근거·감정 상태·내가 정한 위험 한도를 확인하세요. 실시간 시세나 뉴스는 반영하지 않으며, 운세는 매수·매도 신호나 수익 예측이 아닙니다.';
 const sections=[
 ['오늘의 전체 흐름',theme.text+' 내 일간의 '+ELEMENTS[day]+'와 오늘 천간의 '+ELEMENTS[other]+'를 비교하면 '+REL_NAMES[idx]+'의 주제로 읽습니다. '+REL_REASON[idx]+' 오늘 해야 할 일 중 이 주제와 연결되는 한 가지를 골라 실제 경험에 비추어 살펴보세요.'],
 ['재물·소비·자원 관리',theme.money+' '+ACTIONS[idx][0]+' 필요해서 쓰는 돈과 기분에 따라 쓰는 돈을 구분하고, 중요한 지출은 금액과 목적을 한 번 더 확인해보세요. 이 해설은 수익이나 투자 타이밍을 예측하는 신호가 아닙니다.'],
 ['투자운세 · 주식·코인',investmentText],
 ['직장·학업·성과',theme.work+' '+ACTIONS[idx][1]+' 가장 중요한 과제 하나를 먼저 정하고 완료 기준을 구체적으로 적어보세요. 준비가 필요한 일과 지금 바로 실행할 일을 나누면 일정의 부담을 줄이는 데 도움이 될 수 있습니다.'],
 ['관계·감정·대화',theme.love+' '+ACTIONS[idx][2]+' 상대의 의도를 짐작하기보다 실제로 원하는 것을 물어보세요. 의견이 다를 때는 사실, 내가 느낀 점, 부탁하고 싶은 행동을 나누어 말하면 대화할 주제가 명확해집니다.'],
 ['생활 리듬·컨디션',theme.well+' '+ACTIONS[idx][3]+' 피곤함이나 부담을 운의 좋고 나쁨으로 해석하지 말고 수면, 일정, 최근의 생활 변화를 살펴보세요. 이 항목은 몸의 상태를 진단하는 내용이 아니라 일상을 돌아보는 일반적인 안내입니다.'],
 ['오늘의 실행 계획과 마무리','아침에는 꼭 해야 할 행동 한 가지를 정하고, 낮에는 진행 상황을 확인하세요. 저녁에는 잘한 행동과 다음에 바꿀 행동을 하나씩 적어보세요. 하루의 결과를 운세 문장에 맞추기보다 실제 경험을 기준으로 판단하고, 오늘 해결하지 못한 일은 다음 일정에 구체적으로 옮겨보세요.']
 ];
 return '<div class="card today one-page-report"><small>TODAY · 한국 날짜 기준 · A4 약 1페이지</small><h2>오늘의 운세 · '+date+'</h2><p class="today-title">'+theme.title.replace('해','하루')+'</p><p class="report-meta">오늘 일진 '+korean(pair)+' ('+pair+') · 나의 일간 오행 '+ELEMENTS[day]+' · 오늘 천간 오행 '+ELEMENTS[other]+'</p>'+sections.map(v=>'<section class="reading-section"><h3>'+v[0]+'</h3><p>'+v[1]+'</p></section>').join('')+'<p class="note">한국 날짜의 정오 일진을 대표로 사용하며 일간·일진 천간의 오행 관계에 따른 문화 해설입니다. 동일한 일간 오행은 같은 날 같은 해설을 공유합니다. 실제 사건이나 확률을 예측하지 않습니다.</p></div>';
}
function nameOnePageReport(raw,parts){
 const base=parts?.length===3?parts:null;
 const configs=[
 ['초년 · 배움과 자신감','원격',[1,2],'초년은 학습과 경험을 쌓으며 생활의 기초를 만드는 단계로 읽습니다. 자신감을 얻었던 환경과 꾸준히 했던 행동을 떠올려보세요. 새로운 일을 시작할 때 결과만 평가하기보다 연습한 과정과 도움받을 방법을 살피는 것이 좋습니다. 다른 사람의 기대에 맞추느라 자신의 속도를 놓치지 않는지도 돌아보세요.','이번 주 배우고 싶은 한 가지를 작은 단위로 나누어 연습하고, 잘된 점과 바꿀 점을 기록해보세요.'],
 ['중년 · 활동과 선택','형격',[0,1],'중년은 사회에서 역할을 만들고 시간과 자원의 우선순위를 선택하는 단계로 읽습니다. 성과뿐 아니라 신뢰와 약속을 지키는 행동도 살펴보세요. 목표를 정할 때 얻고 싶은 것과 유지하고 싶은 것을 함께 적으면 선택 기준이 명확해집니다. 기대에 비해 부담이 크다면 범위와 지원 조건을 조율해보세요.','중요한 목표를 세 개 이하로 정하고 맡은 역할, 필요한 도움, 완료 기준을 문장으로 정리하세요.'],
 ['장년 · 유지와 변화','이격',[0,2],'장년은 만들어온 기반을 지키면서 변화할 여지를 남기는 단계로 읽습니다. 경험을 나누고 반복되는 일을 더 효율적으로 만드는 강점을 살펴보세요. 책임을 혼자 떠안거나 익숙한 방식만 고집하지 않는지도 확인할 수 있습니다. 지속할 일과 줄일 부담을 구분하고 회복할 시간을 남겨보세요.','앞으로 유지할 활동, 나눌 수 있는 책임, 새롭게 배우고 싶은 것을 하나씩 골라 실행 계획을 세워보세요.'],
 ['전체 · 방향과 종합','정격',[0,1,2],'전체는 배움, 선택, 유지와 변화의 흐름을 함께 돌아보는 해설입니다. 이름의 뜻 중 공감하는 가치를 골라 실제 행동과 연결해보세요. 한 번의 성과나 어려움이 삶 전체를 결정하지 않습니다. 계산값을 인생의 등급으로 받아들이기보다 지금 조절할 수 있는 관계와 습관, 선택을 살피는 편이 좋습니다.','지키고 싶은 가치 세 가지와 이번 달 행동 한 가지를 적고, 한 달 뒤 실제 경험을 확인해 계획을 수정하세요.']
 ];
 const mode=$('hanjaMode').value;
 const strokeLine=parts?'글자별 획수 '+parts.join(' · ')+'획 · 전체 합계 '+parts.reduce((a,b)=>a+b,0)+'획':'한자 획수 미입력 · 수리 계산 제외';
 return '<p class="report-meta">'+(mode==='auto'?'선택한 한자의 자동 획수 구성 · ':'')+strokeLine+'</p><p class="note">세 글자 이름은 원격·형격·이격·정격을 아래 네 부분에 연결합니다. 연령 범위는 유파마다 달라 고정 나이를 지정하지 않습니다.</p>'+configs.map((v,i)=>{
 const value=base?v[2].reduce((sum,n)=>sum+base[n],0):null;
 const equation=base?v[2].map(n=>base[n]).join(' + ')+' = '+value+'획':'한 글자 성과 두 글자 이름인 경우 계산';
 return '<section class="reading-section name-reading"><small>NAME PERIOD '+(i+1)+' / 4</small><h3>'+v[0]+' · '+v[1]+' · '+(value===null?'미산출':value+'획')+'</h3><p class="formula">'+v[1]+' 계산: '+equation+'</p><p>'+v[3]+'</p><p><strong>실천:</strong> '+v[4]+'</p></section>';
 }).join('')+'<p class="note">격수는 입력 획수로 계산하며 단계별 생활 해설은 공통 안내입니다. 수리별 81수 길흉·성공 확률·개명 필요성은 판정하지 않습니다. 다른 글자 수·복성·한글 이름은 사격 계산을 제외하고 네 단계 해설을 제공합니다.</p>';
}

function longReport(pairs,counts,day,annual,annualE,year,name){
 const idx=relation(day,annualE),el=ELEMENT_DETAIL[day],total=counts.reduce((a,b)=>a+b,0);
 const pillarTexts=[
 ['년주','태어난 해의 기둥으로, 전통적으로 성장의 배경과 가족·사회 환경을 살피는 자리입니다. 다만 같은 해에 태어난 사람도 서로 다른 환경에서 성장합니다. 이 기둥은 과거의 사건이나 가족관계를 확정하는 진술이 아니라, 내가 어떤 환경 속에서 기준을 만들었는지 돌아보는 질문으로 활용하는 편이 적절합니다.','어릴 때 배운 가치 중 지금도 도움이 되는 것은 무엇인가요? 지금의 나에게 맞지 않아 바꾸고 싶은 기준도 함께 적어보세요.'],
 ['월주','태어난 계절과 절입을 담는 기둥입니다. 전통 명리에서는 사회에서 활동하는 방식과 일의 환경을 읽을 때 중요하게 다룹니다. 절입 전후에는 월주가 달라질 수 있어 달력의 월 숫자와 일치하지 않습니다. 이 앱은 절입을 사용하지만 월령에 따른 기운의 세기나 직업 적성을 판정하지는 않습니다.','일을 잘할 수 있었던 환경을 떠올려보세요. 혼자 집중할 때와 협업할 때 각각 어떤 조건이 필요했나요?'],
 ['일주','태어난 날의 기둥입니다. 위 글자인 일간은 사주 전체를 읽는 기준점이며 아래 글자인 일지는 전통적으로 일상과 가까운 관계를 살피는 자리입니다. 일간의 오행은 하나의 상징적 성향을 설명하지만 성격 전체를 결정하지는 않습니다. 관계의 좋고 나쁨이나 배우자의 성격도 일주 하나만으로 확정할 수 없습니다.','가까운 사람과 편안하게 지낼 때 내가 하는 행동은 무엇인가요? 갈등이 생겼을 때 바꿀 수 있는 말이나 습관 한 가지를 찾아보세요.'],
 ['시주','출생시간의 기둥으로 전통적으로 삶에서 이어갈 관심과 이후의 방향을 살피는 자리입니다. 시간은 두 시간 간격의 지지로 나뉘고 천간은 일간과 연결됩니다. 자녀 유무, 노년의 재산이나 수명 등을 이 글자로 단정하지 않습니다. 시간이 불확실하면 시주와 관련한 해석을 남겨두는 것이 좋습니다.','앞으로 배우고 싶은 것과 오래 지속하고 싶은 활동을 적어보세요. 외부의 기대보다 내가 실제로 즐기는 방향을 생각해보세요.']
 ];
 const page1='<section class="card report-page"><small>사주팔자 상세 해설 · 1 / 3</small><h2>'+name+'의 사주를 읽는 방법</h2><p>사주팔자는 출생 연·월·일·시의 네 기둥을 각각 천간과 지지의 두 글자로 표현한 여덟 글자입니다. 천간은 갑·을·병·정·무·기·경·신·임·계, 지지는 자·축·인·묘·진·사·오·미·신·유·술·해로 이어집니다. 글자 자체가 사건을 예언하는 문장은 아니며, 전통에서 사용하는 관계와 계절의 상징을 정리한 좌표로 이해할 수 있습니다.</p>'+pillarTexts.map((v,i)=>'<h3>'+v[0]+' · '+(pairs[i]?korean(pairs[i])+' ('+pairs[i]+')':'시간 미상')+'</h3><p>'+v[1]+'</p><p class="reflection"><strong>나를 위한 질문:</strong> '+v[2]+'</p>').join('')+'<h3>해석의 중심은 일간입니다</h3><p>당신의 일간은 '+korean(pairs[2][0])+'이며 대표 오행은 '+ELEMENTS[day]+'입니다. '+el[1]+' 최근 이 특징이 도움이 되었던 구체적인 장면을 떠올려보세요. 경험과 맞지 않는 설명은 억지로 자신에게 끼워 맞추지 않아도 됩니다.</p><p class="note">양력·한국 표준시, 입춘과 절입 기준. 진태양시·역사적 서머타임은 반영하지 않습니다. 출생시간 미상은 시주를 제외하고 절입 판정에 정오를 가정합니다.</p></section>';
 const page2='<section class="card report-page"><small>사주팔자 상세 해설 · 2 / 3</small><h2>오행과 나의 균형을 이해하기</h2><p>오행은 목·화·토·금·수라는 다섯 상징으로 변화와 관계를 설명하는 전통 체계입니다. 이 앱은 '+total+'개의 표시된 글자에서 천간과 지지의 대표 오행을 각각 한 개씩 셉니다. 당신의 분포는 '+ELEMENTS.map((v,i)=>v+' '+counts[i]+'개').join(', ')+'입니다. 이 숫자는 기운의 세기를 측정한 점수나 타고난 능력의 순위가 아닙니다.</p>'+ELEMENTS.map((v,i)=>'<h3>'+v+' · '+ELEMENT_DETAIL[i][0]+' · '+counts[i]+'개</h3><p>'+ELEMENT_DETAIL[i][1]+' 이 특징을 긍정적으로 활용했던 순간과 균형이 필요했던 순간을 각각 떠올려보세요. '+ELEMENT_DETAIL[i][2]+'</p><p class="reflection"><strong>균형을 위한 실천:</strong> '+ELEMENT_DETAIL[i][3]+'</p>').join('')+'<h3>상생은 연결, 상극은 조절의 상징입니다</h3><p>상생은 목→화→토→금→수→목으로 이어지며, 한 기운이 다음 기운을 돕는 관계로 설명합니다. 상극은 목→토→수→화→금→목으로 이어지며, 서로를 조절하고 경계를 만드는 관계로 설명합니다. 상생이라고 항상 좋은 일이 생기거나 상극이라고 반드시 어려움이 생기는 것은 아닙니다. 전체 구성과 맥락을 함께 보는 것이 전통 해석의 원칙입니다.</p><h3>많고 적음만으로 판단하지 않는 이유</h3><p>지지는 내부에 여러 천간을 담는 지장간으로도 풀이하며, 같은 오행도 태어난 계절과 다른 글자의 관계에 따라 다르게 해석합니다. 표에 0개가 표시되어도 정밀 해석에서 해당 오행이 완전히 없다는 뜻은 아닙니다. 개수만으로 신강·신약, 용신·희신을 선정하지 않습니다. 이 앱은 그 판단을 제공하지 않습니다.</p><p class="note">생활 제안은 자기 성찰을 위한 예시입니다. 특정 색·방향·숫자·상품이 운을 바꾼다는 처방은 하지 않습니다.</p></section>';
 const page3='<section class="card report-page"><small>사주팔자 상세 해설 · 3 / 3</small><h2>'+year+'년을 내 생활에 연결하는 방법</h2><p>'+year+'년은 '+korean(annual)+'년입니다. 내 일간의 '+ELEMENTS[day]+'와 올해 천간의 '+ELEMENTS[annualE]+'를 비교해 '+REL_NAMES[idx]+'의 큰 주제로 설명했습니다. '+REL_REASON[idx]+' '+THEMES[idx].text+' 이 흐름은 입춘부터 다음 입춘까지를 뜻하며, 실제 취업·승진·결혼·투자 성과를 예언하는 설명은 아닙니다.</p>'+[['재물과 자원','돈을 많이 벌 것인지 단정하기보다 돈을 다루는 습관을 살펴보세요. 고정 지출, 선택 지출과 미래를 위한 자금을 나누고 실제 기록에서 개선할 부분을 찾아보는 방식이 도움이 됩니다.',THEMES[idx].money,ACTIONS[idx][0]],['직장과 성장','어떤 일이 나에게 중요한지, 그 일을 완수하려면 어떤 조건이 필요한지 구체적으로 생각해보세요. 개인의 역량뿐 아니라 업무 환경, 제도와 협업 방식도 결과에 영향을 줍니다.',THEMES[idx].work,ACTIONS[idx][1]],['관계와 소통','관계의 결과를 사주에 맡기기보다 대화와 행동을 관찰해보세요. 내가 기대하는 것과 상대가 원하는 것을 따로 적으면 서로의 차이를 이해하는 데 도움이 될 수 있습니다.',THEMES[idx].love,ACTIONS[idx][2]],['생활 리듬과 회복','오행에서 질병을 진단하거나 신체 상태를 추정하지 않습니다. 여기서는 평소의 생활 리듬과 부담을 돌아보는 일반적인 질문을 제시합니다. 내 상태는 실제 경험과 필요한 전문 상담을 바탕으로 확인하세요.',THEMES[idx].well,ACTIONS[idx][3]]].map(v=>'<h3>'+v[0]+'</h3><p>'+v[1]+' '+v[2]+'</p><p class="reflection"><strong>실천할 행동:</strong> '+v[3]+'</p>').join('')+'<h3>월별 운세는 어떻게 사용하나요?</h3><p>월별 노트는 양력 매월 15일의 절기 월주를 대표로 삼아 내 일간과 그 달 천간의 오행 관계를 비교합니다. 특정 날짜가 매수·이직·결혼의 최적 시점이라는 뜻은 아닙니다. 월초와 절입 경계에서는 월주가 바뀔 수 있습니다. 한 달에 한 가지 목표를 고르고 실제 결과를 기록하는 참고 노트로 활용해보세요.</p><h3>한 달 뒤 확인할 나의 기록</h3><p>① 이번 달의 목표 한 가지 ② 실행할 작은 행동 ③ 실행할 날짜 ④ 실제로 달라진 점 ⑤ 다음 달에 유지하거나 바꿀 점을 적어보세요. 해설이 맞았다는 느낌만으로 평가하지 말고, 맞지 않았던 사례도 함께 기록하면 자신을 더 균형 있게 이해할 수 있습니다.</p><p class="note">이 보고서는 오행의 큰 관계를 설명하는 문화 콘텐츠입니다. 음양에 따른 십신 세분, 합충형해·대운·용신을 종합한 정밀 감정은 포함하지 않습니다. 동일한 일간 오행은 같은 연도 해설을 공유합니다.</p></section>';
 return '<div id="sajuReport" class="report">'+page1+page2+page3+'</div>';
}

function render(){
 $('error').textContent='';
 try{
 if(typeof Solar==='undefined')throw Error('계산 파일을 불러오지 못했습니다. 새로고침해주세요.');
 const value=birthDate();if(!value)throw Error('생년월일을 입력해주세요.');
 const [y,m,d]=value.split('-').map(Number), dt=new Date(Date.UTC(y,m-1,d));
 if(y<1900||y>2100||dt.getUTCMonth()+1!==m||dt.getUTCDate()!==d||value>new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'}))throw Error('실제 출생한 날짜를 입력해주세요.');
 const unknown=activePage==='today'||$('unknown').checked;
 if(!unknown&&!$('time').value)throw Error('출생시간을 입력하거나 시간 미상을 선택해주세요.');
 const [h,min]=unknown?[12,0]:$('time').value.split(':').map(Number);
 const year=activePage==='today'?currentBirthYear:Number($('year').value);if(!Number.isInteger(year)||year<1901||year>2099)throw Error('운세 연도는 1901~2099년 사이로 입력해주세요.');
 const result=pillars(y,m,d,h,min,activePage==='today'?2:Number($('sect').value),unknown),pairs=result.pairs;
 const counts=[0,0,0,0,0];pairs.filter(Boolean).forEach(p=>{counts[GE[GAN.indexOf(p[0])]]++;counts[ZE[ZHI.indexOf(p[1])]]++;});
 const total=counts.reduce((a,b)=>a+b,0),day=GE[GAN.indexOf(pairs[2][0])];
 const annual=Solar.fromYmd(year,7,1).getLunar().getEightChar().getYear(), annualE=GE[GAN.indexOf(annual[0])],t=THEMES[relation(day,annualE)];
 const name=escapeHtml($('name').value.trim()||'당신');
 if(activePage==='today'){
 $('dailyResult').innerHTML=todayFortune(day)+outputActions('dailyResult','today');
 routePage();if(window.matchMedia('(max-width:760px)').matches)$('dailyResult').scrollIntoView({behavior:'smooth',block:'start'});
 return;
 }
 const column=pairs.map((p,i)=>'<div class="column"><small>'+['년주','월주','일주','시주'][i]+'</small><strong>'+(p?p[0]+'<br>'+p[1]:'—<br>—')+'</strong><span>'+(p?korean(p):'시간 미상')+'</span></div>').join('');
 let months='';for(let mo=1;mo<=12;mo++){const p=pillars(year,mo,15,12,0).pairs[1],mt=THEMES[relation(day,GE[GAN.indexOf(p[0])])];months+='<div class="month"><strong>'+mo+'월 · '+korean(p)+'</strong><p>'+mt.title.replace('해','흐름')+'</p><p><strong>활동</strong> '+mt.work+'</p><p><strong>자원</strong> '+mt.money+'</p><p><strong>관계</strong> '+mt.love+'</p></div>';}
 $('result').innerHTML='<div class="card headline"><small>YOUR PERSONAL NOTE · '+year+'</small><h2>'+name+'의 '+year+'년 사주 노트</h2><p>'+korean(annual)+'년 · '+t.title+'</p><p>'+t.text+'</p></div><div class="card"><small>02 / 네 기둥</small><h2>나의 사주팔자</h2><div class="columns">'+column+'</div><p class="note">양력 '+value+' · '+(unknown?'출생시간 미상':$('time').value+' 한국 표준시')+' · 일주는 '+($('sect').value==='2'?'밤 12시':'밤 11시')+' 기준</p><h3>일간 '+korean(pairs[2][0])+' · '+ELEMENTS[day]+'의 기운</h3><p>'+PERSONAL[day]+'</p></div><div class="card"><small>03 / 오행의 균형</small><h2>다섯 기운의 구성</h2>'+ELEMENTS.map((el,i)=>'<div class="barrow"><span>'+el+' ('+['木','火','土','金','水'][i]+')</span><div class="track"><div class="fill" style="width:'+counts[i]/total*100+'%;background:'+COLORS[i]+'"></div></div><span>'+counts[i]+'개</span></div>').join('')+'<p class="note">천간과 지지의 대표 오행을 단순 집계합니다. 지장간·월령 가중치·신강약·용신은 판단하지 않습니다. 없는 오행이 불운을 뜻하지 않습니다.</p></div><div class="card"><small>04 / 올해의 해설</small><h2>'+year+'년, 나를 위한 네 가지 질문</h2><div class="grid">'+[['재물 · 자원',t.money],['직장 · 성장',t.work],['관계 · 소통',t.love],['생활 · 컨디션',t.well]].map(v=>'<div class="mini"><h3>'+v[0]+'</h3><p>'+v[1]+'</p></div>').join('')+'</div><p class="note">일간 오행과 해당 연도 천간의 상생·상극 관계로 생성한 일반 해설입니다. 신살·대운·합충 전체를 종합한 정밀 감정은 아닙니다. 연도 운세는 입춘부터 다음 입춘까지의 기운을 뜻합니다.</p></div><div class="card"><small>05 / 월별 노트</small><h2>한 달씩 살펴보는 흐름</h2><p class="note">양력 매월 15일의 절기 월주를 대표로 사용합니다. 월초·절입 전후에는 월주가 다를 수 있습니다.</p><div class="months">'+months+'</div><div class="actions"><button id="copy" type="button">결과 전체 복사</button><button id="print" type="button" class="secondary">사주 해설 3페이지 · PDF 저장</button></div><p id="copyStatus" role="status" class="note"></p></div>';
 const monthlyCard=$('copy').parentElement.parentElement;
 monthlyCard.insertAdjacentHTML('afterend',longReport(pairs,counts,day,annual,annualE,year,name));
 splitBirthResults();
 $('print').onclick=()=>printPage('saju');
 $('copy').onclick=async()=>{const text=$('result').innerText;try{await navigator.clipboard.writeText(text);$('copyStatus').textContent='전체 결과를 복사했습니다.';}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();$('copyStatus').textContent=ok?'전체 결과를 복사했습니다.':'복사가 지원되지 않습니다. 결과를 선택하여 복사해주세요.';}};
 if(window.matchMedia('(max-width:760px)').matches)$('result').scrollIntoView({behavior:'smooth',block:'start'});
 }catch(e){$('dailyResult').innerHTML='<div class="card"><p>입력값을 확인한 뒤 다시 조회해주세요.</p></div>';$('error').textContent=e.message;$('result').innerHTML='<div class="card empty"><h2>입력값을 확인해주세요</h2><p>오류를 수정한 뒤 다시 조회해주세요.</p></div>';}
}
$('year').value=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Seoul'}).slice(0,4);
$('unknown').onchange=()=>{$('time').disabled=$('unknown').checked;};
$('form').onsubmit=e=>{e.preventDefault();render();};
$('sample').onclick=()=>{$('name').value='예시';$('birthYear').value='1990';$('birthMonth').value='5';updateBirthDays();$('birthDay').value='15';$('time').value='09:30';$('unknown').checked=false;$('time').disabled=false;render();};

function birthDate(){
 const y=$('birthYear').value,m=$('birthMonth').value,d=$('birthDay').value;
 return y&&m&&d?y+'-'+m.padStart(2,'0')+'-'+d.padStart(2,'0'):'';
}
function updateBirthDays(){
 const y=Number($('birthYear').value),m=Number($('birthMonth').value),previous=$('birthDay').value;
 const days=y&&m?new Date(Date.UTC(y,m,0)).getUTCDate():0;
 $('birthDay').innerHTML='<option value="">일 선택</option>'+Array.from({length:days},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'일</option>').join('');
 $('birthDay').value=Number(previous)<=days?previous:'';
 $('birthDay').disabled=!days;
}
const currentBirthYear=Number(new Intl.DateTimeFormat('en',{year:'numeric',timeZone:'Asia/Seoul'}).format(new Date()));
for(let y=currentBirthYear;y>=1900;y--)$('birthYear').insertAdjacentHTML('beforeend','<option value="'+y+'">'+y+'년</option>');
for(let m=1;m<=12;m++)$('birthMonth').insertAdjacentHTML('beforeend','<option value="'+m+'">'+m+'월</option>');
$('birthYear').onchange=updateBirthDays;
$('birthMonth').onchange=updateBirthDays;
updateBirthDays();

let activePage='home';
function routePage(){
 const route=location.hash.slice(1);activePage=['today','saju','name','match'].includes(route)?route:'home';
 const home=activePage==='home';
 $('homePage').hidden=!home;$('homeHero').hidden=!home;$('pageHeading').hidden=home;$('pageTabs').hidden=home;
 const titles={today:'오늘의 운세',saju:'사주팔자',name:'성명학',match:'궁합'};
 const descriptions={today:'생년월일을 입력하여 오늘의 해설만 확인하세요.',saju:'사주팔자와 오행, 올해의 흐름을 자세히 살펴보세요.',name:'이름의 뜻과 한자 획수 구성을 확인하세요.',match:'두 사람의 생년월일로 관계의 기운을 비교하세요.'};
 $('pageTitle').textContent=titles[activePage]||'';$('pageDescription').textContent=descriptions[activePage]||'';
 $('birthTitle').textContent=activePage==='today'?'오늘의 운세를 위한 생년월일':'사주팔자를 위한 출생 정보';
 $('birthSubmit').textContent=activePage==='today'?'오늘의 운세만 보기 ↗':'사주팔자 보기 ↗';
 for(const id of ['time','unknown','year','sect']){const field=$(id).closest('label');if(field)field.hidden=activePage==='today';}
 document.body.dataset.page=activePage;document.body.dataset.printPage=activePage;
 $('birthLayout').hidden=!['today','saju'].includes(activePage);
 $('dailyResult').hidden=activePage!=='today';$('result').hidden=activePage!=='saju';
 $('namePage').hidden=activePage!=='name';$('matchPage').hidden=activePage!=='match';
 document.querySelectorAll('[data-page]').forEach(a=>{a.setAttribute('aria-current',a.dataset.page===activePage?'page':'false');});
 document.title=home?'사주노트 · 원하는 메뉴 선택':titles[activePage]+' · 사주노트';
}
function printPage(page){document.body.dataset.printPage=page;window.print();}
function outputActions(target,page){
 return '<div class="actions"><button type="button" data-copy="'+target+'">결과 전체 복사</button><button type="button" data-print="'+page+'">이 페이지 인쇄 · PDF 저장</button></div><p class="note output-status" role="status"></p>';
}
async function copyOutput(target,button){
 const container=$(target),text=container.innerText;let ok=false;
 try{await navigator.clipboard.writeText(text);ok=true;}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove();}
 button.parentElement.nextElementSibling.textContent=ok?'전체 결과를 복사했습니다.':'결과를 선택해 복사해주세요.';
}
document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.dataset.print)printPage(button.dataset.print);if(button.dataset.copy)copyOutput(button.dataset.copy,button);});
function splitBirthResults(){
 const today=$('result').querySelector('.today');
 if(today){$('dailyResult').replaceChildren(today);$('dailyResult').insertAdjacentHTML('beforeend',outputActions('dailyResult','today'));}
 routePage();
}
window.addEventListener('hashchange',routePage);
function addDateSelects(id,prefix){
 $(id).innerHTML=['연도','월','일'].map((label,i)=>'<label>'+label+'<select required id="'+prefix+i+'"><option value="">선택</option></select></label>').join('');
 const year=$(prefix+'0'),month=$(prefix+'1'),day=$(prefix+'2');
 for(let y=currentBirthYear;y>=1900;y--)year.add(new Option(y+'년',y));
 for(let m=1;m<=12;m++)month.add(new Option(m+'월',m));
 const update=()=>{const prior=day.value,n=year.value&&month.value?new Date(Date.UTC(Number(year.value),Number(month.value),0)).getUTCDate():0;day.innerHTML='<option value="">선택</option>';for(let d=1;d<=n;d++)day.add(new Option(d+'일',d));day.value=Number(prior)<=n?prior:'';day.disabled=!n;};
 year.onchange=month.onchange=update;update();
}
function readMatchDate(prefix){
 const vals=[0,1,2].map(i=>Number($(prefix+i).value));const [y,m,d]=vals;
 if(!y||!m||!d)throw Error('두 사람의 생년월일을 모두 선택해주세요.');
 const date=new Date(Date.UTC(y,m-1,d));if(date>new Date()||date.getUTCMonth()+1!==m||date.getUTCDate()!==d)throw Error('실제 출생한 날짜를 입력해주세요.');
 return vals;
}
addDateSelects('dateA','aBirth');addDateSelects('dateB','bBirth');
$('matchForm').onsubmit=e=>{
 e.preventDefault();$('matchError').textContent='';
 try{
 const a=readMatchDate('aBirth'),b=readMatchDate('bBirth');
 const pa=pillars(...a,12,0).pairs,pb=pillars(...b,12,0).pairs;
 const ea=GE[GAN.indexOf(pa[2][0])],eb=GE[GAN.indexOf(pb[2][0])],ab=relation(ea,eb),ba=relation(eb,ea);
 const na=escapeHtml($('personA').value.trim()||'첫 번째 사람'),nb=escapeHtml($('personB').value.trim()||'두 번째 사람');
 const kind=ea===eb?'비슷한 기운을 가진 관계':'서로 다른 기운을 만나는 관계';
 $('matchResult').innerHTML=compatibilityScoreCard(pa,pb)+'<div class="card"><small>두 사람의 관계 노트</small><h2>'+na+' × '+nb+'</h2><div class="grid"><div class="mini"><h3>'+na+'</h3><p>'+a.join('-')+' · 일주 '+korean(pa[2])+' · '+ELEMENTS[ea]+'</p><p>'+PERSONAL[ea]+'</p></div><div class="mini"><h3>'+nb+'</h3><p>'+b.join('-')+' · 일주 '+korean(pb[2])+' · '+ELEMENTS[eb]+'</p><p>'+PERSONAL[eb]+'</p></div></div><h3>'+kind+'</h3><p>'+na+'의 관점에서는 '+REL_NAMES[ab]+'의 관계로 읽습니다. '+REL_REASON[ab]+'</p><p>'+nb+'의 관점에서는 '+REL_NAMES[ba]+'의 관계로 읽습니다. '+REL_REASON[ba]+'</p><h3>서로를 이해하는 실천</h3><p>'+ACTIONS[ab][2]+' '+ACTIONS[ba][2]+'</p><h3>두 사람이 함께 이야기할 질문</h3><p>① 쉬고 싶을 때 어떤 도움이 필요한가요?<br>② 돈과 시간을 쓰는 기준은 어떻게 다른가요?<br>③ 의견이 다를 때 대화를 잠시 멈추는 신호를 정할 수 있나요?<br>④ 함께 지킬 작은 약속 한 가지는 무엇인가요?</p><h3>관계의 균형</h3><p>같은 오행은 공통점을 살피는 소재가 되고 다른 오행은 서로의 방식을 이해하는 소재가 됩니다. 상생이 항상 좋은 궁합, 상극이 나쁜 궁합을 뜻하지 않습니다. 실제 관계는 존중·신뢰·대화·생활 환경을 통해 확인하세요.</p><p class="note">일간 대표 오행만 비교한 전통 문화 해설입니다. 생년월일로 실제 결혼 성사율·이별 여부를 산출하지 않습니다. 상단 점수는 앱에서 정한 오행 구성 유사도에 따른 재미용 지표입니다. 입력은 저장하거나 서버로 전송하지 않습니다.</p></div>'+matchPeriodReport(na,nb,ea,eb,ab,ba)+outputActions('matchResult','match');
 }catch(err){$('matchError').textContent=err.message;$('matchResult').innerHTML='';}
};
$('nameForm').onsubmit=e=>{
 e.preventDefault();$('nameError').textContent='';
 try{
 const raw=$('fullName').value.normalize('NFC').replace(/\s/g,'');if(!raw)throw Error('이름을 입력해주세요.');
 validateHanjaSelection(raw);
 const name=escapeHtml(raw),hanja=escapeHtml($('hanjaName').value.trim());
 const rawStrokes=$('strokes').value.trim();let numeric='',periodParts=null;
 if(rawStrokes){
 const parts=rawStrokes.split(/[,，\s]+/).map(Number);
 if(parts.length<2||parts.length>5||parts.some(n=>!Number.isInteger(n)||n<1||n>64))throw Error('획수는 1~64의 정수 2~5개를 쉼표로 구분해주세요.');
 if(parts.length!==[...raw].filter(c=>!/\s/.test(c)).length)throw Error('이름 글자 수와 획수 개수를 맞춰주세요.');
 periodParts=parts;const sum=parts.reduce((a,b)=>a+b,0);
 numeric='<h3>'+($('hanjaMode').value==='auto'?'선택한 한자의 자동 획수 구성':'직접 입력한 획수 구성')+'</h3><p>'+parts.map((n,i)=>escapeHtml([...raw].filter(c=>!/\s/.test(c))[i])+' '+n+'획').join(' · ')+'<br>전체 합계: '+sum+'획</p>';
 if(parts.length===3){
 const [surname,first,last]=parts;
 numeric+='<h3>세 글자 이름의 사격 수리</h3><div class="grid">'+[['원격',first+last,'이름 두 글자의 획수를 더한 값'],['형격',surname+first,'성의 획수와 이름 첫 글자를 더한 값'],['이격',surname+last,'성의 획수와 이름 끝 글자를 더한 값'],['정격',sum,'세 글자 전체 획수를 더한 값']].map(v=>'<div class="mini"><h3>'+v[0]+' · '+v[1]+'획</h3><p>'+v[2]+'</p></div>').join('')+'</div><p class="note">한 글자 성과 두 글자 이름을 가정한 국내 일부 성명학의 사격 계산 방식입니다. 복성이나 다른 체계에서는 계산법이 다릅니다. 수리의 길흉표·81수 해석이나 작명 적합성을 판정하지 않습니다.</p>';
 }else numeric+='<p class="note">사격 계산은 한 글자 성과 두 글자 이름인 경우만 제공합니다. 다른 구성은 글자별 획수와 전체 합계만 표시합니다.</p>';
 }
 $('nameResult').innerHTML='<div class="card one-page-report"><small>이름의 네 시기 노트 · A4 약 1페이지</small><h2>'+name+'의 성명학 상세 풀이</h2><p>'+(hanja?'선택한 한자: '+hanja:'한글 이름 · 한자 미입력')+'</p><p>'+(escapeHtml(selectedHanjaMeanings())||'글자의 뜻을 임의로 추정하지 않습니다.')+'</p>'+nameOnePageReport(raw,periodParts)+'<p class="note">한 글자 성과 두 글자 이름에 사격 계산을 적용합니다. 자동 획수는 Unicode 일반 총획수로 원획과 다를 수 있습니다. 이름의 길흉·개명 필요성이나 인생 사건을 단정하지 않습니다. 입력정보는 저장하거나 전송하지 않습니다.</p></div>'+outputActions('nameResult','name');
 }catch(err){$('nameError').textContent=err.message;$('nameResult').innerHTML='';}
};
routePage();

let hanjaSelections=[];
function namePeriodReport(raw,parts){
 const letters=[...raw],selected=$('hanjaMode').value==='auto'?selectedHanjaMeanings():'';
 const base=parts&&parts.length===3?parts:null;
 const configs=[
 {title:'초년 · 성장과 배움',gyeok:'원격',formula:'이름 첫 글자 + 이름 끝 글자',value:base?base[1]+base[2]:null,indices:[1,2],
  focus:'초년은 새로운 경험을 배우고 생활의 기초를 만드는 단계로 읽습니다. 학습 습관, 자신감을 얻는 방식, 주변의 도움을 받는 태도를 돌아보는 주제입니다.',
  strength:'잘하는 일을 발견하려면 결과만 평가하기보다 과정에서 꾸준히 했던 행동을 살펴보세요. 이름 글자의 의미는 자신에게 기대할 수 있는 가치를 떠올리는 소재가 됩니다.',
  balance:'다른 사람의 평가나 기대를 모두 충족하려 하면 자신의 속도를 놓칠 수 있습니다. 잘되지 않은 경험을 성격의 결함으로 단정하기보다 방법과 환경을 바꿔볼 기회로 생각해보세요.',
  action:'배우고 싶은 것 한 가지를 정해 작은 단위로 연습하고, 한 주에 한 번 배운 점을 기록해보세요. 도움이 필요할 때 요청할 사람도 미리 떠올려보세요.',
  question:'어떤 환경에서 자신감이 생겼나요? 지금 새로 배우는 일에도 그 조건을 만들 수 있나요?'},
 {title:'중년 · 사회 활동과 선택',gyeok:'형격',formula:'성 + 이름 첫 글자',value:base?base[0]+base[1]:null,indices:[0,1],
  focus:'중년은 사회에서 자신의 역할을 정하고 활동 범위를 넓혀가는 단계로 읽습니다. 직장, 일의 방향, 책임과 관계에서 무엇을 우선할지 선택하는 주제를 다룹니다.',
  strength:'능력을 보여주는 방법은 다양한데, 눈에 띄는 성과뿐 아니라 신뢰를 쌓고 약속을 지키는 행동도 중요한 자산입니다. 자신이 오래 지속할 수 있는 활동 방식을 구체적으로 찾아보세요.',
  balance:'성과와 타인의 기대를 기준으로만 선택하면 시간과 자원을 과하게 사용할 수 있습니다. 목표를 세울 때 얻고 싶은 것과 지키고 싶은 것을 함께 적어보세요.',
  action:'당장 중요한 목표를 세 개 이하로 줄이고, 맡은 역할과 필요한 지원을 문장으로 정리하세요. 돈과 시간의 사용 결과를 주기적으로 확인하면 선택 기준이 명확해집니다.',
  question:'남에게 보여줄 성과와 나에게 필요한 만족 사이에서 어떤 균형을 원하나요?'},
 {title:'장년 · 유지와 책임의 균형',gyeok:'이격',formula:'성 + 이름 끝 글자',value:base?base[0]+base[2]:null,indices:[0,2],
  focus:'장년은 이미 만들어온 기반을 유지하면서 다음 방향을 준비하는 단계로 읽습니다. 관계의 지속, 역할 분담, 변화에 대한 유연성과 회복의 여지를 돌아봅니다.',
  strength:'축적한 경험을 다른 사람과 나누고, 반복되는 일을 더 효율적으로 만드는 능력을 살펴보세요. 무엇을 계속하고 무엇을 줄일지 구분하는 판단도 성장의 한 형태입니다.',
  balance:'책임을 혼자 떠안거나 익숙한 방식만 고집하면 변화할 여지가 줄어들 수 있습니다. 주변에 맡길 수 있는 일과 직접 해야 할 일을 구분하고, 기존의 선택을 수정할 여유를 남겨보세요.',
  action:'지속하고 싶은 관계와 활동, 정리하고 싶은 부담을 따로 적으세요. 장기 목표를 현실적인 단계로 나누고, 회복할 시간과 새로운 배움도 계획에 포함해보세요.',
  question:'현재의 기반을 유지하면서 새롭게 시도하고 싶은 변화 한 가지는 무엇인가요?'},
 {title:'전체 · 삶의 방향과 종합',gyeok:'정격',formula:'성 + 이름 첫 글자 + 이름 끝 글자',value:base?base.reduce((a,b)=>a+b,0):null,indices:[0,1,2],
  focus:'전체 해설은 초년의 배움, 중년의 선택, 장년의 유지와 변화를 한 흐름으로 묶어봅니다. 이름의 수리는 계산된 상징이며, 삶의 전체 가치를 평가하는 점수가 아닙니다.',
  strength:'서로 다른 시기의 경험을 연결하면 일관되게 지켜온 가치가 드러날 수 있습니다. 이름의 의미 중 자신이 공감하는 부분을 골라 실제로 어떤 행동으로 보여줄지 생각해보세요.',
  balance:'한 번의 좋은 결과나 어려움이 인생 전체를 규정하지 않습니다. 이름을 바꿔야 성공한다거나 특정 수리가 실패를 결정한다는 결론을 내리기보다 현재 조절할 수 있는 선택을 살펴보세요.',
  action:'앞으로 지키고 싶은 가치 세 가지와 이번 달 행동 한 가지를 기록하세요. 한 달 뒤 경험을 확인해 계획을 수정하고, 해설과 맞지 않았던 사례도 함께 남겨보세요.',
  question:'이름의 뜻과 별개로 내가 직접 선택해 이어가고 싶은 삶의 기준은 무엇인가요?'}
 ];
 return '<div class="period-intro"><h3>초년·중년·장년·전체, 네 가지 상세 풀이</h3><p>세 글자 이름은 원격·형격·이격·정격을 각각 아래 네 부분에 연결합니다. 시기별 연령 구분은 유파마다 달라 고정 나이를 지정하지 않습니다. 획수는 계산하고, 각 단계의 해설은 이름의 상징을 생활에 연결하는 참고 내용으로 제공합니다.</p></div>'+configs.map((c,i)=>{
 const symbol=c.indices.filter(n=>letters[n]).map(n=>{
 const item=$('hanjaMode').value==='auto'?HANJA_DATA.characters[hanjaSelections[n]?.char]:null;
 return escapeHtml(letters[n])+(item?' · '+item.c+' ('+(item.m||'뜻 별도 확인')+')':'');
 }).join(' / ');
 return '<section class="period-card"><small>NAME PERIOD '+(i+1)+' / 4</small><h3>'+c.title+'</h3><div class="period-basis"><strong>'+c.gyeok+' · '+(c.value===null?'격수 미산출':c.value+'획')+'</strong><p>계산식: '+c.formula+(base?' = '+c.indices.map(n=>base[n]).join(' + ')+' = '+c.value:' · 한 글자 성과 두 글자 이름을 가정합니다.')+'</p><p>살펴볼 글자: '+(symbol||escapeHtml(raw))+'</p></div><h4>이 시기의 해석</h4><p>'+c.focus+'</p><h4>살펴볼 강점과 기회</h4><p>'+c.strength+'</p><h4>균형을 위해 주의할 점</h4><p>'+c.balance+'</p><h4>구체적인 실천 방법</h4><p>'+c.action+'</p><p class="reflection"><strong>나에게 묻는 질문:</strong> '+c.question+'</p></section>';
 }).join('')+'<p class="note">수리별 81수 길흉 등급과 사건 예측은 산출하지 않습니다. 같은 획수 구성은 같은 격수가 나오며 생활 해설은 단계별 공통 안내입니다. 두 글자·복성·그 외 이름 및 한자 없는 이름은 네 단계 해설을 제공하되 위 사격 수리를 적용하지 않습니다.</p>';
}
function matchPeriodReport(na,nb,ea,eb,ab,ba){
 const same=ea===eb;
 const pair=same?'공통된 관심과 생활 방식이 연결의 소재가 될 수 있습니다. 다만 비슷한 취향이 모든 상황에서 같은 판단을 한다는 뜻은 아닙니다.':'서로 다른 표현 방식과 우선순위를 알아가는 관계로 읽을 수 있습니다. 차이를 좋고 나쁨으로 분류하기보다 각자가 편안함을 느끼는 조건을 확인해보세요.';
 const balances=[
 '비슷한 방식이 편안하게 느껴질 수 있지만, 서로 잘한다고 생각하는 영역에서 경쟁이나 비교가 생기지 않는지 돌아보세요.',
 '한쪽이 아이디어를 내거나 표현하는 흐름으로 읽습니다. 도움과 표현이 일방적인 요구가 되지 않도록 서로 원하는 지원을 확인해보세요.',
 '한쪽이 현실적인 기준이나 자원 관리를 중시하는 흐름으로 읽습니다. 관리와 통제를 혼동하지 않고 결정권을 함께 나누는 것이 중요합니다.',
 '한쪽이 책임과 기준의 영향을 더 크게 느끼는 흐름으로 읽습니다. 기대가 부담이 되지 않도록 동의와 조율을 먼저 확인해보세요.',
 '한쪽이 조언과 배움, 지원을 받는 흐름으로 읽습니다. 도움을 줄 때 상대가 원하는 방식인지 묻고 독립적인 선택도 존중해보세요.'
 ];
 const stages=[
 {title:'초기·초년 · 서로 알아가는 시기',focus:'처음 관계를 만들 때는 매력과 공통점이 먼저 보이고, 갈등 상황에서의 반응은 아직 충분히 알기 어렵습니다. '+pair,
  communication:na+'은 '+ELEMENTS[ea]+'의 상징, '+nb+'은 '+ELEMENTS[eb]+'의 상징을 가진 일간으로 읽습니다. 처음부터 성격을 단정하지 말고 연락 빈도, 약속 방식, 쉬고 싶은 시간을 서로 물어보세요.',
  practical:'데이트나 만남의 비용, 시간을 정하는 방법을 이야기해보세요. 한 사람이 계속 계획하거나 비용을 부담하는 방식이 자연스럽게 굳어지지 않도록 작은 일부터 함께 결정하는 것이 좋습니다.',
  care:'좋아 보이는 특징만 찾기보다 불편했던 순간도 차분히 확인하세요. 상대의 의사를 묻지 않은 도움이나 너무 빠른 약속은 부담이 될 수 있습니다.',
  action:'이번 주 서로에게 편안했던 행동 하나와 조정하고 싶은 행동 하나를 말해보세요. 상대의 답을 반박하기보다 먼저 요약해서 확인해보세요.'},
 {title:'중기·중년 · 생활과 차이를 맞추는 시기',focus:'관계가 이어지면 취향보다 실제 생활의 차이가 더 뚜렷해질 수 있습니다. 갈등 자체보다 갈등을 어떻게 이야기하고 해결하는지 살펴보는 단계입니다. '+balances[ab],
  communication:na+'의 관점에서는 '+REL_NAMES[ab]+', '+nb+'의 관점에서는 '+REL_NAMES[ba]+'의 주제로 읽습니다. 같은 사건을 서로 다르게 느낄 수 있으므로 사실, 감정, 요청을 구분해 말해보세요.',
  practical:'공동 비용과 개인 비용, 집안일이나 일정 관리의 분담을 구체적으로 적어보세요. 공평함이 반드시 같은 양을 뜻하는 것은 아니므로 각자의 시간과 부담을 함께 고려해야 합니다.',
  care:'말하지 않아도 알 것이라고 기대하거나 과거의 잘못을 한꺼번에 꺼내지 않도록 해보세요. 한 번의 대화에서는 해결할 주제를 하나로 좁히는 편이 좋습니다.',
  action:'한 가지 반복되는 갈등을 고르고 상황, 각자의 필요, 가능한 해결책, 다시 확인할 날짜를 적어 합의해보세요.'},
 {title:'장기·장년 · 관계를 유지하고 변화하는 시기',focus:'오래 이어진 관계에서도 일과 환경, 관심사는 계속 달라질 수 있습니다. 익숙함을 신뢰로 발전시키되 서로를 과거의 모습에 고정하지 않는 태도가 중요합니다.',
  communication:na+'과 '+nb+'에게 지금 필요한 지원이 예전과 같다고 가정하지 마세요. '+balances[ba]+' 서로의 변화한 목표와 혼자 보내고 싶은 시간도 확인해보세요.',
  practical:'장기 목표와 공동 자원을 점검하고, 한 사람에게 결정이나 돌봄의 역할이 몰리지 않는지 살펴보세요. 기존의 분담이 현재 상황에도 맞는지 정기적으로 다시 합의할 수 있습니다.',
  care:'책임을 수행하는 것만으로 정서적 교류가 모두 채워지는 것은 아닙니다. 고마움을 구체적으로 표현하고 함께 즐기는 활동을 새로 만들어보세요.',
  action:'한 달에 한 번 관계 점검 시간을 정해 유지할 습관, 바꿀 부담, 새롭게 함께 해볼 일 한 가지를 이야기해보세요.'},
 {title:'전체 · 두 사람의 궁합 종합',focus:'두 일간의 대표 오행은 '+ELEMENTS[ea]+'와 '+ELEMENTS[eb]+'입니다. '+pair+' 관계의 전체 방향은 계산된 상징보다 실제 존중과 신뢰, 반복되는 행동을 통해 확인할 수 있습니다.',
  communication:'상생은 돕는 상징, 상극은 조절하는 상징으로 설명합니다. 어느 관계든 조언·관리·지원이 상대의 동의와 선택권을 존중하는지 확인해야 합니다.',
  practical:'함께 원하는 관계의 모습, 돈과 시간의 기준, 개인의 자율성, 갈등 후 회복 방법을 네 가지 핵심 주제로 정리해보세요.',
  care:'특정 시기에 반드시 결혼하거나 이별한다는 예측은 하지 않습니다. 비슷한 오행도 갈등할 수 있고 다른 오행도 좋은 관계를 만들 수 있으므로 결과에 맞춰 현실을 해석하지 않아도 됩니다.',
  action:'서로 지킬 약속 하나, 필요할 때 부탁할 도움 하나, 개인적으로 존중받고 싶은 경계 하나를 정해보세요. 실제 경험을 통해 합의를 수정해가는 것이 중요합니다.'}
 ];
 return '<div class="period-intro"><h3>네 가지 시기로 살펴보는 상세 궁합</h3><p>초기·중기·장기는 실제 나이나 정해진 연수가 아닌 관계의 진행 단계입니다. 특정 시기의 대운이나 사건을 별도로 계산한 결과가 아니라, 두 일간 오행의 관계를 각 단계의 대화와 생활에 적용한 해설입니다.</p></div>'+stages.map((s,i)=>'<section class="period-card"><small>RELATIONSHIP PERIOD '+(i+1)+' / 4</small><h3>'+s.title+'</h3><h4>관계의 흐름</h4><p>'+s.focus+'</p><h4>감정과 의사소통</h4><p>'+s.communication+'</p><h4>재물·생활·역할 분담</h4><p>'+s.practical+'</p><h4>주의할 갈등과 균형</h4><p>'+s.care+'</p><p class="reflection"><strong>함께 실천할 방법:</strong> '+s.action+'</p></section>').join('');
}

function nameLetters(){return [...$('fullName').value.normalize('NFC').replace(/\s/g,'')];}
function renderHanjaChoices(){
 $('nameResult').innerHTML='';$('nameError').textContent='';
 const letters=nameLetters(),prior=hanjaSelections;
 hanjaSelections=letters.map((letter,i)=>({letter,char:prior[i]?.letter===letter?prior[i].char:''}));
 if(!letters.length){$('hanjaChoices').innerHTML='<p class="note">이름을 입력하면 글자별 한자 후보가 나타납니다.</p>';syncHanjaSelection();return;}
 $('hanjaChoices').innerHTML=letters.map((letter,i)=>{
 const candidates=HANJA_DATA.byReading[letter]||[],representative=candidates.filter(c=>HANJA_DATA.characters[c].m),other=candidates.filter(c=>!HANJA_DATA.characters[c].m);
 const options=cs=>cs.map(c=>{const item=HANJA_DATA.characters[c];return '<option value="'+c+'"'+(hanjaSelections[i].char===c?' selected':'')+'>'+c+' · '+(item.m||'추가 후보')+' · '+item.n+'획'+(item.alt?' (표기별 차이)':'')+'</option>';}).join('');
 return '<div class="hanja-letter"><label for="hanjaPick'+i+'">'+(i+1)+'번째 글자 · '+escapeHtml(letter)+'</label><select id="hanjaPick'+i+'" data-hanja-index="'+i+'"'+(!candidates.length?' disabled':'')+'><option value="">'+(candidates.length?'실제 이름의 한자를 선택':'등록된 후보 없음')+'</option>'+(representative.length?'<optgroup label="대표 후보">'+options(representative)+'</optgroup>':'')+(other.length?'<optgroup label="그 밖의 후보">'+options(other)+'</optgroup>':'')+'</select><p class="note">'+(candidates.length?candidates.length+'개 후보 · 같은 음의 다른 한자는 뜻과 획수가 다릅니다.':'한글 이름 모드 또는 직접 입력 모드를 이용해주세요.')+'</p></div>';
 }).join('');
 syncHanjaSelection();
}
function syncHanjaSelection(){
 if($('hanjaMode').value!=='auto')return;
 const complete=hanjaSelections.length>0&&hanjaSelections.every(v=>v.char);
 $('hanjaName').value=complete?hanjaSelections.map(v=>v.char).join(''):'';
 $('strokes').value=complete?hanjaSelections.map(v=>HANJA_DATA.characters[v.char].n).join(', '):'';
 const selected=hanjaSelections.filter(v=>v.char).length;
 $('hanjaHint').textContent=complete?'한자 '+$('hanjaName').value+' · 획수 '+$('strokes').value+' 자동 입력 완료':selected+' / '+hanjaSelections.length+' 글자 선택 · 모든 글자의 한자를 선택하면 획수가 자동 입력됩니다.';
 $('nameResult').innerHTML='';
}
function selectedHanjaMeanings(){
 if($('hanjaMode').value!=='auto')return '';
 return hanjaSelections.filter(v=>v.char).map(v=>v.char+' ('+v.letter+') · '+(HANJA_DATA.characters[v.char].m||'뜻은 별도 사전에서 확인해주세요')).join(' / ');
}
function validateHanjaSelection(raw){
 if($('hanjaMode').value==='auto'){
 const letters=[...raw];
 if(letters.length!==hanjaSelections.length||hanjaSelections.some((v,i)=>v.letter!==letters[i]))renderHanjaChoices();
 if(!hanjaSelections.length||hanjaSelections.some(v=>!v.char))throw Error('글자별 한자를 모두 선택해주세요. 후보가 없는 경우 직접 입력 또는 한글 이름 모드를 선택하세요.');
 syncHanjaSelection();
 }
}
$('hanjaChoices').addEventListener('change',e=>{
 const index=Number(e.target.dataset.hanjaIndex);
 if(!Number.isInteger(index)||!hanjaSelections[index])return;
 const c=e.target.value,letter=hanjaSelections[index].letter;
 hanjaSelections[index].char=(HANJA_DATA.byReading[letter]||[]).includes(c)?c:'';
 syncHanjaSelection();
});
$('fullName').addEventListener('input',e=>{if(!e.isComposing)renderHanjaChoices();});
$('fullName').addEventListener('compositionend',renderHanjaChoices);
$('hanjaMode').onchange=()=>{
 const mode=$('hanjaMode').value;
 $('hanjaChoices').hidden=mode!=='auto';
 $('hanjaName').readOnly=$('strokes').readOnly=mode!=='manual';
 $('hanjaName').closest('label').hidden=$('strokes').closest('label').hidden=mode==='hangul';
 $('nameError').textContent='';$('nameResult').innerHTML='';
 if(mode==='auto'){renderHanjaChoices();}
 else if(mode==='hangul'){$('hanjaName').value='';$('strokes').value='';$('hanjaHint').textContent='한자를 사용하지 않는 이름으로 해설합니다. 획수는 추정하지 않습니다.';}
 else{$('hanjaHint').textContent='한자와 글자별 획수를 직접 확인하여 입력해주세요.';}
};
renderHanjaChoices();


function compatibilityPercent(pairsA,pairsB){
 const distribution=pairs=>{const counts=[0,0,0,0,0];for(const p of pairs.slice(0,3)){counts[GE[GAN.indexOf(p[0])]]++;counts[ZE[ZHI.indexOf(p[1])]]++;}return counts;};
 const a=distribution(pairsA),b=distribution(pairsB),overlap=a.reduce((sum,n,i)=>sum+Math.min(n,b[i]),0);
 return {score:Math.round(overlap/6*100),a,b};
}
function compatibilityScoreCard(pa,pb){
 const result=compatibilityPercent(pa,pb);
 return '<section class="card compatibility-score" style="border-color:#bda772;text-align:center"><small>COMPATIBILITY · 두 사람의 궁합</small><h2>궁합 점수</h2><strong style="display:block;font-size:56px;line-height:1.3;color:#9f7640">'+result.score+'%</strong><div class="track" style="max-width:360px;margin:20px auto"><div class="fill" style="width:'+result.score+'%;background:#648b63"></div></div><p class="note">오행 구성 유사도를 활용한 재미용 점수 · 실제 결혼 확률이 아닙니다.</p><details style="text-align:left"><summary>점수 계산 기준</summary><p>두 사람의 년주·월주·일주에 표시된 여섯 글자의 대표 오행을 각각 집계합니다. 같은 오행으로 겹치는 개수의 합을 6으로 나누고 100을 곱해 반올림합니다. 같은 오행 구성은 같은 점수가 나오며 두 사람의 순서를 바꿔도 점수는 같습니다.</p><p>첫 번째 사람: '+ELEMENTS.map((el,i)=>el+' '+result.a[i]+'개').join(' · ')+'<br>두 번째 사람: '+ELEMENTS.map((el,i)=>el+' '+result.b[i]+'개').join(' · ')+'</p><p>앱에서 정한 구성 비교 규칙으로, 검증된 궁합 평가나 전통 명리의 통일된 점수 체계는 아닙니다. 높은 유사도가 좋은 관계를 보장하거나 낮은 유사도가 나쁜 관계를 뜻하지 않습니다. 출생시간·대운·전체 합충은 점수에 반영하지 않습니다.</p></details></section>';
}
