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

function render(){
 $('error').textContent='';
 try{
 if(typeof Solar==='undefined')throw Error('계산 파일을 불러오지 못했습니다. 새로고침해주세요.');
 const value=birthDate();if(!value)throw Error('생년월일을 입력해주세요.');
 const [y,m,d]=value.split('-').map(Number), dt=new Date(Date.UTC(y,m-1,d));
 if(y<1900||y>2100||dt.getUTCMonth()+1!==m||dt.getUTCDate()!==d||value>new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'}))throw Error('실제 출생한 날짜를 입력해주세요.');
 const unknown=$('unknown').checked;
 if(!unknown&&!$('time').value)throw Error('출생시간을 입력하거나 시간 미상을 선택해주세요.');
 const [h,min]=unknown?[12,0]:$('time').value.split(':').map(Number);
 const year=Number($('year').value);if(!Number.isInteger(year)||year<1901||year>2099)throw Error('운세 연도는 1901~2099년 사이로 입력해주세요.');
 const result=pillars(y,m,d,h,min,Number($('sect').value),unknown),pairs=result.pairs;
 const counts=[0,0,0,0,0];pairs.filter(Boolean).forEach(p=>{counts[GE[GAN.indexOf(p[0])]]++;counts[ZE[ZHI.indexOf(p[1])]]++;});
 const total=counts.reduce((a,b)=>a+b,0),day=GE[GAN.indexOf(pairs[2][0])];
 const annual=Solar.fromYmd(year,7,1).getLunar().getEightChar().getYear(), annualE=GE[GAN.indexOf(annual[0])],t=THEMES[relation(day,annualE)];
 const name=escapeHtml($('name').value.trim()||'당신');
 const column=pairs.map((p,i)=>'<div class="column"><small>'+['년주','월주','일주','시주'][i]+'</small><strong>'+(p?p[0]+'<br>'+p[1]:'—<br>—')+'</strong><span>'+(p?korean(p):'시간 미상')+'</span></div>').join('');
 let months='';for(let mo=1;mo<=12;mo++){const p=pillars(year,mo,15,12,0).pairs[1],mt=THEMES[relation(day,GE[GAN.indexOf(p[0])])];months+='<div class="month"><strong>'+mo+'월 · '+korean(p)+'</strong><p>'+mt.title.replace('해','흐름')+'</p><p><strong>활동</strong> '+mt.work+'</p><p><strong>자원</strong> '+mt.money+'</p><p><strong>관계</strong> '+mt.love+'</p></div>';}
 $('result').innerHTML='<div class="card headline"><small>YOUR PERSONAL NOTE · '+year+'</small><h2>'+name+'의 '+year+'년 사주 노트</h2><p>'+korean(annual)+'년 · '+t.title+'</p><p>'+t.text+'</p></div><div class="card"><small>02 / 네 기둥</small><h2>나의 사주팔자</h2><div class="columns">'+column+'</div><p class="note">양력 '+value+' · '+(unknown?'출생시간 미상':$('time').value+' 한국 표준시')+' · 일주는 '+($('sect').value==='2'?'밤 12시':'밤 11시')+' 기준</p><h3>일간 '+korean(pairs[2][0])+' · '+ELEMENTS[day]+'의 기운</h3><p>'+PERSONAL[day]+'</p></div><div class="card"><small>03 / 오행의 균형</small><h2>다섯 기운의 구성</h2>'+ELEMENTS.map((el,i)=>'<div class="barrow"><span>'+el+' ('+['木','火','土','金','水'][i]+')</span><div class="track"><div class="fill" style="width:'+counts[i]/total*100+'%;background:'+COLORS[i]+'"></div></div><span>'+counts[i]+'개</span></div>').join('')+'<p class="note">천간과 지지의 대표 오행을 단순 집계합니다. 지장간·월령 가중치·신강약·용신은 판단하지 않습니다. 없는 오행이 불운을 뜻하지 않습니다.</p></div><div class="card"><small>04 / 올해의 해설</small><h2>'+year+'년, 나를 위한 네 가지 질문</h2><div class="grid">'+[['재물 · 자원',t.money],['직장 · 성장',t.work],['관계 · 소통',t.love],['생활 · 컨디션',t.well]].map(v=>'<div class="mini"><h3>'+v[0]+'</h3><p>'+v[1]+'</p></div>').join('')+'</div><p class="note">일간 오행과 해당 연도 천간의 상생·상극 관계로 생성한 일반 해설입니다. 신살·대운·합충 전체를 종합한 정밀 감정은 아닙니다. 연도 운세는 입춘부터 다음 입춘까지의 기운을 뜻합니다.</p></div><div class="card"><small>05 / 월별 노트</small><h2>한 달씩 살펴보는 흐름</h2><p class="note">양력 매월 15일의 절기 월주를 대표로 사용합니다. 월초·절입 전후에는 월주가 다를 수 있습니다.</p><div class="months">'+months+'</div><div class="actions"><button id="copy" type="button">결과 전체 복사</button><button id="print" type="button" class="secondary">인쇄 · PDF 저장</button></div><p id="copyStatus" role="status" class="note"></p></div>';
 const monthlyCard=$('copy').parentElement.parentElement;
 monthlyCard.insertAdjacentHTML('afterend',detailedGuide(pairs,counts,day,annual,annualE,year));
 $('print').onclick=()=>window.print();
 $('copy').onclick=async()=>{const text=$('result').innerText;try{await navigator.clipboard.writeText(text);$('copyStatus').textContent='전체 결과를 복사했습니다.';}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();$('copyStatus').textContent=ok?'전체 결과를 복사했습니다.':'복사가 지원되지 않습니다. 결과를 선택하여 복사해주세요.';}};
 if(window.matchMedia('(max-width:760px)').matches)$('result').scrollIntoView({behavior:'smooth',block:'start'});
 }catch(e){$('error').textContent=e.message;$('result').innerHTML='<div class="card empty"><h2>입력값을 확인해주세요</h2><p>오류를 수정한 뒤 다시 조회해주세요.</p></div>';}
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
